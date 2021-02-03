import { useState, useRef, useEffect } from "react";
import * as PDFJS from "pdfjs-dist";

export function useLoadPdf(canvasRef) {
  const [pdfPages, setPdfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [numOfPages, setNumOfPages] = useState(null);
  const [viewport, setViewport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const renderContextRef = useRef(null);

  // PDF reader
  // @@ TRIGGERED ON INPUT CHANGE

  function handlePdfLoad(e) {
    setIsLoading(true);
    setCurrentPage(null);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", async e => {
      try {
        const typedarray = new Uint8Array(e.currentTarget.result);
        PDFJS.GlobalWorkerOptions.workerSrc =
          "//cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.worker.js";
        const pdfReader = PDFJS.getDocument(typedarray);
        const pdf = await pdfReader.promise;
        const pages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          pages.push(page);
        }
        const scale = 0.8;
        const viewport = pages[0].getViewport({ scale });
        //SET TO REACT STATE
        setPdfPages(pages);
        setViewport(viewport);
        setNumOfPages(pdf.numPages);
        setHasLoaded(true);
      } catch (e) {
        console.log(e);
      }
    });

    //READING BLOB
    reader.readAsArrayBuffer(file);
  }

  // INIT CANVAS context

  useEffect(() => {
    if (viewport) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.height = viewport.height || 500;
      canvasRef.current.width = viewport.width || 500;
      renderContextRef.current = {
        canvasContext: ctx,
        viewport: viewport
      };
      setCurrentPage(1);
    }
  }, [viewport]);

  //EFFECT THAT WAITS FOR PDF TO BE READ BEFORE DISPLAYING IT TO CANVAS

  useEffect(() => {
    if (renderContextRef.current) renderPdf();

    async function renderPdf() {
      await pdfPages[currentPage - 1].render(renderContextRef.current);
      setIsLoading(false);
    }
  }, [currentPage]);

  function handleIncrementPage() {
    if (pdfPages) setIsLoading(true);
    setCurrentPage(curr => (curr % numOfPages) + 1);
  }

  function handleDecrementPage() {
    if (currentPage <= 1) return;
    if (pdfPages) setIsLoading(true);
    setCurrentPage(curr => curr - 1);
  }
  return {
    handlePdfLoad,
    handleIncrementPage,
    handleDecrementPage,
    currentPage,
    isLoading,
    hasLoaded,
    numOfPages
  };
}
