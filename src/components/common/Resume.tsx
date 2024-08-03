import { ReactElement } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import resume from "/resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export const Resume = (): ReactElement => {
  return (
    <Document file={resume}>
      <Page
        className="m-auto w-fit"
        pageNumber={1}
        width={1000}
        renderTextLayer={false}
      />
    </Document>
  );
};
