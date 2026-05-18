export function PDFReportButton(){return <button className="btn-secondary w-full sm:w-auto" type="button" onClick={()=>typeof window!=="undefined"&&window.print()}>Downloadable PDF report</button>}
