const FileSummary = () => {
  const fakesummary = {
    id: "1",
    planName: "SRS-software requirmant specification",
    comment: "",
    file: [],
    progress: 70,
    receiver: "",
    sender: "",
    files: [
      "SRS-templateeeeeeeee.pdf",
      "SRS.ppt",
      "SRS.ppt",
      "SRS.ppt",
      "SRS.ppt",
      "SRS.ppt",
      "SRS.ppt",
      "SRS.ppt",
    ],
    createAt: "09/05/2566 03:05:15 PM",
  };


  return fakesummary["files"].slice(0, 2).map((fileName, index) => (
    <div className="w-[100px] flex h-[27px] border border-teal-800 rounded-full bg-neutral-100 px-3  justify-center items-center text-sm scroll-ml-6 snap-start">
      <div className="truncate overflow-hidden">{fileName}</div>
    </div>
  ));
};

export default FileSummary;
