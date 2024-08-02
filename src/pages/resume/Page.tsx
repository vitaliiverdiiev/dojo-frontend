import { Spinner } from "@/components";
import { ReactElement } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Doc from "/resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function Resume(): ReactElement {
  return (
    <div className="flex h-full justify-center overflow-y-auto">
      <Document
        file={Doc}
        // className="flex justify-center"
        loading={<Spinner />}
      >
        <Page pageNumber={1} width={1000} />
      </Document>
    </div>
  );
}
