import MarkdownIt from "markdown-it";

export interface ParsedMarkdownContent {
  title: string;
  contact: string[];
  summary: string;
  sections: MarkdownSection[];
}

export interface MarkdownSection {
  heading: string;
  content: MarkdownElement[];
}

export interface MarkdownElement {
  type: "paragraph" | "list" | "job-title" | "heading";
  content: string;
  level?: number;
  items?: string[];
  listMarker?: "•" | "-";
  company?: string;
  position?: string;
  date?: string;
}

/**
 * Clean markdown content to be more ATS-friendly
 * Based on the Python implementation
 */
export function cleanMarkdownForATS(content: string): string {
  // Remove complex markdown features that might confuse ATS
  // Keep basic formatting: headers, lists, bold, italic

  // Remove code blocks and inline code
  content = content.replace(/```[\s\S]*?```/g, "");
  content = content.replace(/`([^`]+)`/g, "$1");

  // Remove links but keep the text
  content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove images
  content = content.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");

  // Fix bullet point formatting - ensure proper markdown list syntax
  content = fixBulletPointFormatting(content);

  // Clean up multiple newlines
  content = content.replace(/\n\n+/g, "\n\n");

  return content.trim();
}

/**
 * Fix bullet point formatting to ensure they're recognized as proper markdown lists
 */
function fixBulletPointFormatting(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let inListContext = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this line is a bullet point (but not bold/italic formatting)
    const isBulletPoint =
      trimmed.startsWith("•") ||
      trimmed.startsWith("- ") ||
      (trimmed.startsWith("* ") && !trimmed.startsWith("**"));

    if (isBulletPoint) {
      // Ensure there's a blank line before the first list item if we're not already in a list
      if (
        !inListContext &&
        result.length > 0 &&
        result[result.length - 1].trim() !== ""
      ) {
        result.push("");
      }

      // Convert bullet points to standard markdown format with proper spacing
      if (trimmed.startsWith("•")) {
        result.push(`- ${trimmed.substring(1).trim()}`);
      } else if (trimmed.startsWith("- ")) {
        result.push(`- ${trimmed.substring(2).trim()}`);
      } else if (trimmed.startsWith("* ")) {
        result.push(`- ${trimmed.substring(2).trim()}`);
      }

      inListContext = true;
    } else if (trimmed === "") {
      // Empty line - preserve it and reset list context
      result.push(line);
      inListContext = false;
    } else {
      // Non-list line
      if (inListContext) {
        // Add a blank line after list if next line isn't empty
        result.push("");
        inListContext = false;
      }
      result.push(line);
    }
  }

  return result.join("\n");
}

/**
 * Check if a line contains job title with company and date pattern
 */
export function isJobTitleLine(text: string): boolean {
  // Check for patterns like: **Position** at **Company** • *Date*
  const hasMultipleBold = (text.match(/\*\*[^*]+\*\*/g) || []).length >= 2;
  const hasItalic = /\*[^*]+\*/.test(text) || /_[^_]+_/.test(text);
  const hasBullet = text.includes("•");

  return hasMultipleBold && hasItalic && hasBullet;
}

/**
 * Parse job title line to extract position, company, and date
 */
export function parseJobTitleLine(text: string): {
  position: string;
  company: string;
  date: string;
} {
  // Extract italic text (usually the date)
  const italicMatch = text.match(/\*([^*]+)\*|_([^_]+)_/);
  const date = italicMatch ? italicMatch[1] || italicMatch[2] : "";

  // Remove the date from the text
  const mainText = text.replace(/\*([^*]+)\*|_([^_]+)_/, "").trim();

  // Extract bold text (position and company)
  const boldMatches = mainText.match(/\*\*([^*]+)\*\*/g) || [];
  const position = boldMatches[0] ? boldMatches[0].replace(/\*\*/g, "") : "";
  const company = boldMatches[1] ? boldMatches[1].replace(/\*\*/g, "") : "";

  return { position, company, date };
}

/**
 * Check if text contains contact information patterns
 */
export function isContactInfo(text: string): boolean {
  const contactPatterns = [
    /[\w\.-]+@[\w\.-]+\.\w+/, // Email
    /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/, // Phone
    /linkedin\.com\/in\/[\w-]+/, // LinkedIn
    /github\.com\/[\w-]+/, // GitHub
  ];

  return contactPatterns.some((pattern) => pattern.test(text.toLowerCase()));
}

/**
 * Detect the list marker type from original markdown content
 */
function detectListMarker(originalContent: string): "•" | "-" {
  // Look for the original list marker in the source markdown (before cleaning)
  const lines = originalContent.split("\n");

  // Find lines that contain list markers
  for (const line of lines) {
    const trimmed = line.trim();
    // Check for lines that start with list markers
    if (trimmed.startsWith("•")) {
      return "•";
    } else if (
      trimmed.startsWith("- ") ||
      (trimmed.startsWith("* ") && !trimmed.startsWith("**"))
    ) {
      return "-";
    }
  }

  // Default to bullet point
  return "•";
}

/**
 * Parse markdown content into structured format for PDF generation
 */
export function parseMarkdownContent(
  markdownContent: string,
): ParsedMarkdownContent {
  // Detect list marker from original content before cleaning
  const originalListMarker = detectListMarker(markdownContent);

  const cleaned = cleanMarkdownForATS(markdownContent);
  const md = new MarkdownIt();
  const tokens = md.parse(cleaned, {});

  let title = "";
  const contact: string[] = [];
  let summary = "";
  const sections: MarkdownSection[] = [];
  let currentSection: MarkdownSection | null = null;
  let isInSummary = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "heading_open") {
      const nextToken = tokens[i + 1];
      if (nextToken && nextToken.type === "inline") {
        const headingText = nextToken.content;

        if (token.tag === "h1" && !title) {
          title = headingText;
          isInSummary = true; // After title, we're in summary mode
        } else if (token.tag === "h2") {
          // Start a new section, exit summary mode
          isInSummary = false;
          if (currentSection) {
            sections.push(currentSection);
          }
          currentSection = {
            heading: headingText,
            content: [],
          };
        } else if (
          currentSection &&
          (token.tag === "h3" || token.tag === "h4")
        ) {
          // Add as heading element within current section
          currentSection.content.push({
            type: "heading",
            content: headingText,
            level: parseInt(token.tag.substring(1)),
          });
        }
      }
    } else if (token.type === "paragraph_open") {
      const nextToken = tokens[i + 1];
      if (nextToken && nextToken.type === "inline") {
        const paragraphText = nextToken.content;

        if (isContactInfo(paragraphText)) {
          contact.push(paragraphText);
        } else if (isInSummary) {
          // Add to summary section
          summary += (summary ? " " : "") + paragraphText;
        } else if (currentSection) {
          if (isJobTitleLine(paragraphText)) {
            const { position, company, date } =
              parseJobTitleLine(paragraphText);
            currentSection.content.push({
              type: "job-title",
              content: paragraphText,
              position,
              company,
              date,
            });
          } else {
            currentSection.content.push({
              type: "paragraph",
              content: paragraphText,
            });
          }
        }
      }
    } else if (token.type === "bullet_list_open") {
      // Process bullet list
      const listItems: string[] = [];
      let j = i + 1;

      while (j < tokens.length && tokens[j].type !== "bullet_list_close") {
        if (
          tokens[j].type === "inline" &&
          tokens[j - 1]?.type === "paragraph_open"
        ) {
          listItems.push(tokens[j].content);
        }
        j++;
      }

      if (currentSection && listItems.length > 0) {
        currentSection.content.push({
          type: "list",
          content: "",
          items: listItems,
          listMarker: originalListMarker,
        });
      }

      i = j; // Skip to end of list
    }
  }

  // Add the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return {
    title,
    contact,
    summary,
    sections,
  };
}
