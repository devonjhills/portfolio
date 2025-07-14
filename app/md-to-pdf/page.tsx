"use client";

import React, { useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Upload,
  Download,
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle,
  File,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

export default function MarkdownToPDFPage() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Handle file upload
  const handleFileUpload = useCallback((file: File) => {
    if (file.type !== "text/markdown" && !file.name.endsWith(".md")) {
      setError("Please upload a valid Markdown file (.md)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdownContent(content);
      setUploadedFile(file.name);
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsText(file);
  }, []);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  // Handle file input change
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  // Convert markdown to PDF
  const handleConvert = useCallback(async () => {
    if (!markdownContent.trim()) {
      setError("Please provide markdown content");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/convert-md-to-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown: markdownContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to convert markdown to PDF");
      }

      // Create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success message
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [markdownContent]);

  // Clear markdown content
  const handleClear = useCallback(() => {
    setMarkdownContent("");
    setUploadedFile(null);
    setError(null);
    setDownloadSuccess(false);
  }, []);

  return (
    <section className="section-primary min-h-screen flex items-center py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Markdown to PDF Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Convert your markdown resume to an ATS-compliant PDF with
              professional formatting
            </p>
          </div>

          {/* Success Message */}
          {downloadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 mx-auto max-w-md">
              <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">
                  PDF downloaded successfully!
                </span>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2">
              <Card className="bg-card border-2 border-primary/30 shadow-lg h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-heading font-bold text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    Input
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Upload a .md file or paste your markdown content
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-4 flex-1 flex flex-col">
                    {/* File Upload Area */}
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                        isDragOver
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}>
                      {uploadedFile ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <File className="h-5 w-5" />
                          <span className="text-sm font-medium">
                            {uploadedFile} uploaded
                          </span>
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop your .md file here, or
                          </p>
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                              <span>Choose File</span>
                            </Button>
                          </label>
                        </>
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        accept=".md,.markdown"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>

                    {/* Textarea */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="markdown-content">
                          Markdown Content:
                        </Label>
                        {markdownContent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="h-6 px-2">
                            <X className="h-3 w-3 mr-1" />
                            Clear
                          </Button>
                        )}
                      </div>
                      <Textarea
                        id="markdown-content"
                        value={markdownContent}
                        onChange={(e) => {
                          setMarkdownContent(e.target.value);
                          setUploadedFile(null); // Clear upload status when typing
                        }}
                        placeholder="# Your Resume"
                        className="border border-secondary h-64"
                      />
                    </div>

                    {/* Error Display */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">
                          {error}
                        </span>
                      </motion.div>
                    )}

                    {/* Convert Button */}
                    <Button
                      onClick={handleConvert}
                      disabled={isLoading || !markdownContent.trim()}
                      className="w-full"
                      size="lg">
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Convert to PDF
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="h-full bg-card border-2 border-primary/30 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-heading font-bold text-foreground">
                    ATS-Compliant Features
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Optimized for Applicant Tracking Systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          Standard Fonts
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Helvetica and Times Roman
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          Clean Structure
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Proper heading hierarchy
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          Professional Layout
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Optimized spacing & alignment
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          Smart Formatting
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Auto job title & date alignment
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2 text-sm">
                      Supported Features:
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Headings (H1, H2, H3)</li>
                      <li>• Bold and italic text</li>
                      <li>• Bullet point lists</li>
                      <li>• Job title formatting</li>
                      <li>• Contact info detection</li>
                      <li>• Professional summaries</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
