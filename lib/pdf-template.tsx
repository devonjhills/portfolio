import React from 'react';
import { Document, Page, Text, View, StyleSheet, TextProps } from '@react-pdf/renderer';
import { ParsedMarkdownContent, MarkdownElement } from './markdown-utils';

// ATS-friendly styles that match the Python implementation
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    paddingTop: 54, // 0.75 inch
    paddingBottom: 54,
    paddingLeft: 54,
    paddingRight: 54,
    lineHeight: 1.2,
  },
  
  // Main heading (Name) - Large, centered, no underline (has decorative line)
  heading1: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  // Contact information - centered, clean
  contact: {
    fontSize: 9,
    fontFamily: 'Times-Roman',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 1.2,
  },
  
  // Section headings - Medium, left-aligned, underlined
  heading2: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'left',
    marginTop: 16,
    marginBottom: 6,
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  
  // Subsection headings - Smaller, bold
  heading3: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 4,
  },
  
  // Job title container for two-column layout
  jobTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 4,
  },
  
  // Job title left side
  jobTitleLeft: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Times-Roman',
    lineHeight: 1.2,
  },
  
  // Job title right side (date)
  jobTitleRight: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
    textAlign: 'right',
    width: 144, // 2 inches
  },
  
  // Body text - clean, readable
  body: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    textAlign: 'left',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  
  // Bullet points - clean with proper indentation
  bullet: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    textAlign: 'left',
    marginBottom: 4,
    marginLeft: 20,
    lineHeight: 1.2,
  },
  
  // Bold text
  bold: {
    fontFamily: 'Times-Bold',
  },
  
  // Italic text
  italic: {
    fontFamily: 'Times-Italic',
  },
  
  // Horizontal line
  horizontalLine: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 3,
    marginBottom: 8,
  },
});

interface PDFTemplateProps {
  content: ParsedMarkdownContent;
}

// Helper component to render text with formatting
const FormattedText = ({ text, style }: { text: string; style?: TextProps['style'] }) => {
  // More robust formatting - handle bold and italic markers
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/);
  
  return (
    <Text style={style}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <Text key={index} style={styles.bold}>
              {part.slice(2, -2)}
            </Text>
          );
        } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return (
            <Text key={index} style={styles.italic}>
              {part.slice(1, -1)}
            </Text>
          );
        } else if (part.startsWith('_') && part.endsWith('_')) {
          return (
            <Text key={index} style={styles.italic}>
              {part.slice(1, -1)}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};

// Component to render a single markdown element
const MarkdownElementComponent: React.FC<{ element: MarkdownElement }> = ({ element }) => {
  switch (element.type) {
    case 'heading':
      const headingStyle = element.level === 3 ? styles.heading3 : styles.body;
      return <FormattedText text={element.content} style={headingStyle} />;
    
    case 'job-title':
      if (element.position && element.company && element.date) {
        return (
          <View style={styles.jobTitleContainer}>
            <View style={styles.jobTitleLeft}>
              <Text>
                <Text style={styles.bold}>{element.position}</Text>
                {' at '}
                <Text style={styles.bold}>{element.company}</Text>
                {' • '}
              </Text>
            </View>
            <View style={styles.jobTitleRight}>
              <Text style={styles.italic}>{element.date}</Text>
            </View>
          </View>
        );
      }
      return <FormattedText text={element.content} style={styles.body} />;
    
    case 'paragraph':
      return <FormattedText text={element.content} style={styles.body} />;
    
    case 'list':
      if (element.items) {
        // Use the original list marker type, defaulting to bullet points
        const marker = element.listMarker || '•';
        
        return (
          <View>
            {element.items.map((item, index) => (
              <FormattedText 
                key={index} 
                text={`${marker} ${item}`} 
                style={styles.bullet} 
              />
            ))}
          </View>
        );
      }
      return null;
    
    default:
      return null;
  }
};

// Main PDF template function that returns a Document element
const PDFTemplate = ({ content }: PDFTemplateProps) => {
  let keyCounter = 0;
  
  return React.createElement(Document, {},
    React.createElement(Page, { size: "LETTER", style: styles.page },
      // Title (Name)
      content.title && React.createElement(React.Fragment, { key: `title-${keyCounter++}` },
        React.createElement(Text, { style: styles.heading1 }, content.title),
        React.createElement(View, { style: styles.horizontalLine })
      ),
      
      // Contact Information
      ...content.contact.map((contactLine, index) =>
        React.createElement(FormattedText, { key: `contact-${index}`, text: contactLine, style: styles.contact })
      ),
      
      // Summary Section
      content.summary && React.createElement(View, { key: `summary-${keyCounter++}`, style: { marginTop: 12, marginBottom: 16 } },
        React.createElement(FormattedText, { text: content.summary, style: styles.body })
      ),
      
      // Sections
      ...content.sections.map((section, sectionIndex) =>
        React.createElement(View, { key: `section-${sectionIndex}` },
          React.createElement(Text, { style: styles.heading2 }, section.heading),
          ...section.content.map((element, elementIndex) =>
            React.createElement(MarkdownElementComponent, { key: `element-${sectionIndex}-${elementIndex}`, element })
          )
        )
      )
    )
  );
};

export default PDFTemplate;