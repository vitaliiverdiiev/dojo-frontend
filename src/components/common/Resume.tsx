import ResumePdf from "@/assets/resume.pdf";
import { ReactElement } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export const Resume = (): ReactElement => {
  return (
    <Document file={ResumePdf}>
      <Page
        className="m-auto w-fit"
        pageNumber={1}
        width={1000}
        renderTextLayer={false}
      />
    </Document>
  );
};
