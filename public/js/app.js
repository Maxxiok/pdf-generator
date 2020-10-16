const pdfForm = document.querySelector('form');
const txt = document.querySelector('input');

const generatePdf = async (content)=>{
    axios.post('/generate', JSON.stringify({text: content}), {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'application/pdf',
            'Content-Type': 'application/json'
        }
    }).then(
        (response)=>{
            const blob = new Blob([response.data], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `test.pdf`;
            link.click();
        }
    );
};

pdfForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await generatePdf(txt.value);
});
