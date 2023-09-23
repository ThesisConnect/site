export function handleFilePreview(url: string, fileType: string): void {
  switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
          previewImage(url);
          break;
      case 'pdf':
          previewPDF(url);
          break;
      case 'mp3':
          previewAudio(url);
          break;
      case 'mp4':
          previewVideo(url);
          break;
      case 'txt':
      case 'csv':
      case 'json':
          previewText(url);
          break;
      default:
          downloadFile(url);
          break;
  }
}

function previewImage(url: string): void {
  window.open(url, '_blank');
}

function previewPDF(url: string): void {
  // Implement using react-pdf or a similar library if you want
  window.open(url, '_blank');  // Basic implementation
}

function previewAudio(url: string): void {
  const audioWindow = window.open("", '_blank');
  audioWindow?.document.write('<audio controls><source src="' + url + '" type="audio/mpeg">Your browser does not support the audio element.</audio>');
}

function previewVideo(url: string): void {
  const videoWindow = window.open("", '_blank');
  videoWindow?.document.write('<video width="320" height="240" controls><source src="' + url + '" type="video/mp4">Your browser does not support the video tag.</video>');
}

function previewText(url: string): void {
  window.open(url, '_blank');
}

function downloadFile(url: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = '';  // this will prompt the user to save the file with its original name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
