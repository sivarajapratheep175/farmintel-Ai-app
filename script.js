  // Disease Detection
  function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.getElementById('previewImg');
      img.src = e.target.result;
      img.style.display = 'block';
      document.getElementById('uploadIcon').style.display = 'none';
      document.getElementById('uploadLabel').textContent = file.name;
    };
    reader.readAsDataURL(file);
  }

  const diseases = [
    { name: '🔴 Tomato Early Blight', conf: 94, treat: '💊 Copper fungicide தெளிக்கவும்' },
    { name: '🟠 Potato Late Blight', conf: 88, treat: '💊 Mancozeb 2.5g/L கலந்து தெளிக்கவும்' },
    { name: '🟡 Rice Leaf Smut', conf: 91, treat: '💊 Propiconazole fungicide பயன்படுத்தவும்' },
    { name: '✅ நோய் இல்லை (Healthy)', conf: 97, treat: '✅ உங்கள் பயிர் ஆரோக்கியமாக உள்ளது!' },
  ];

  function detectDisease() {
    const btn = document.getElementById('detectBtnText');
    const spinner = document.getElementById('detectSpinner');
    const resultBox = document.getElementById('resultBox');

    btn.textContent = 'AI பகுப்பாய்வு செய்கிறது...';
    spinner.style.display = 'inline-block';
    resultBox.classList.remove('visible');

    setTimeout(() => {
      const d = diseases[Math.floor(Math.random() * diseases.length)];
      document.getElementById('resultDisease').textContent = d.name;
      document.getElementById('confText').textContent = d.conf + '% — ' + (d.conf > 90 ? 'மிக அதிக நம்பகத்தன்மை' : 'நடுத்தர நம்பகத்தன்மை');
      document.getElementById('treatText').textContent = d.treat;

      spinner.style.display = 'none';
      btn.textContent = '🔬 மீண்டும் பரிசோதிக்க';
      resultBox.classList.add('visible');

      setTimeout(() => {
        document.getElementById('confBar').style.width = d.conf + '%';
      }, 100);
    }, 2200);
  }

  // Voice Assistant
  let voiceActive = false;
  const voiceAnswers = {
    rain: '🌧️ ஆம்! நாளை மாலை 4 மணிக்கு மழை வரும் வாய்ப்பு 80% உள்ளது. இன்று நீர் பாய்ச்சாதீர்கள்.',
    tomato: '🍅 இன்று தக்காளி விலை ₹250/கிலோ. கோவை சந்தையில் விலை 12% அதிகரித்துள்ளது.',
    water: '💧 உங்கள் மண் ஈரப்பதம் 68% உள்ளது. தக்காளிக்கு இன்று காலை நீர் பாய்ச்சவும். மற்றவைகள் நாளை சரி.',
    disease: '🔬 கடைசியாக scan செய்த பயிரில் Tomato Early Blight நோய் 94% நம்பகத்தன்மையில் கண்டறியப்பட்டது.',
  };

  function toggleVoice() {
    const btn = document.getElementById('voiceBtn');
    const status = document.getElementById('voiceStatus');
    voiceActive = !voiceActive;
    if (voiceActive) {
      btn.classList.add('listening');
      status.textContent = '🔴 கேட்கிறேன்... பேசுங்கள்!';
      setTimeout(() => {
        voiceActive = false;
        btn.classList.remove('listening');
        status.textContent = 'மைக்கை அழுத்தவும்';
      }, 4000);
    } else {
      btn.classList.remove('listening');
      status.textContent = 'மைக்கை அழுத்தவும்';
    }
  }

  function simulateVoice(key) {
    const btn = document.getElementById('voiceBtn');
    const status = document.getElementById('voiceStatus');
    const resp = document.getElementById('voiceResponse');
    const respText = document.getElementById('voiceResponseText');

    btn.classList.add('listening');
    status.textContent = '🔴 பதில் தயாரிக்கிறேன்...';
    resp.classList.remove('visible');

    setTimeout(() => {
      btn.classList.remove('listening');
      status.textContent = '✅ பதில் தயார்';
      respText.textContent = voiceAnswers[key];
      resp.classList.add('visible');
    }, 1200);
  }