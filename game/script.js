const playBtn = document.getElementById('playBtn');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const cardContainer = document.getElementById('cardContainer');

/* 12 färgpar */
const colorPairs = [
  { text: "#FF0000", bg: "#FFE5E5" }, { text: "#007BFF", bg: "#E5F0FF" },
  { text: "#FFD500", bg: "#FFF9E5" }, { text: "#00CC00", bg: "#E5FFE5" },
  { text: "#FF6600", bg: "#FFEDE5" }, { text: "#AA00FF", bg: "#F3E5FF" },
  { text: "#FF1493", bg: "#FFE5F2" }, { text: "#00CED1", bg: "#E5FFFF" },
  { text: "#8B4513", bg: "#F5EDE5" }, { text: "#FF4500", bg: "#FFEDE5" },
  { text: "#228B22", bg: "#E5F5E5" }, { text: "#1E90FF", bg: "#E5F1FF" }
];

/* Svenska A–Ö (paths per your setup: ../images and ../sounds) */
const animals = [
  { letter:"A", name:"Apa",        img:"../images/a_apa.png",        sound:"../sounds/a_apa.mp3",        fact:"Apan gillar att äta bananer." },
  { letter:"B", name:"Björn",      img:"../images/b_bjorn.png",      sound:"../sounds/b_bjorn.mp3",      fact:"Björnen sover hela vintern." },
  { letter:"C", name:"Chinchilla", img:"../images/c_chinchilla.png", sound:"../sounds/c_chinchilla.mp3", fact:"Chinchillan är känd för sin mjuka päls." },
  { letter:"D", name:"Delfin",     img:"../images/d_delfin.png",     sound:"../sounds/d_delfin.mp3",     fact:"Delfinen hoppar högt i vattnet." },
  { letter:"E", name:"Elefant",    img:"../images/e_elefant.png",    sound:"../sounds/e_elefant.mp3",    fact:"Elefanten har en lång snabel." },
  { letter:"F", name:"Får",        img:"../images/f_far.png",        sound:"../sounds/f_far.mp3",        fact:"Fåret säger 'bää'." },
  { letter:"G", name:"Giraff",     img:"../images/g_giraff.png",     sound:"../sounds/g_giraff.mp3",     fact:"Giraffen har en lång hals." },
  { letter:"H", name:"Hund",       img:"../images/h_hund.png",       sound:"../sounds/h_hund.mp3",       fact:"Hunden viftar på svansen när den är glad." },
  { letter:"I", name:"Igelkott",   img:"../images/i_igelkott.png",   sound:"../sounds/i_igelkott.mp3",   fact:"Igelkotten har taggar på ryggen." },
  { letter:"J", name:"Jaguar",     img:"../images/j_jaguar.png",     sound:"../sounds/j_jaguar.mp3",     fact:"Jaguarens päls har svarta fläckar." },
  { letter:"K", name:"Krokodil",   img:"../images/k_krokodil.png",   sound:"../sounds/k_krokodil.mp3",   fact:"Krokodilen simmar i floder." },
  { letter:"L", name:"Lejon",      img:"../images/l_lejon.png",      sound:"../sounds/l_lejon.mp3",      fact:"Lejonet kallas djurens kung." },
  { letter:"M", name:"Mus",        img:"../images/m_mus.png",        sound:"../sounds/m_mus.mp3",        fact:"Musen är liten och snabb." },
  { letter:"N", name:"Noshörning", img:"../images/n_noshorning.png", sound:"../sounds/n_noshorning.mp3", fact:"Noshörningen har ett stort horn på nosen." },
  { letter:"O", name:"Orangutang", img:"../images/o_orangutang.png", sound:"../sounds/o_orangutang.mp3", fact:"Orangutangen gillar att svinga sig i träd." },
  { letter:"P", name:"Panda",      img:"../images/p_panda.png",      sound:"../sounds/p_panda.mp3",      fact:"Pandan äter mest bambu." },
  { letter:"Q", name:"Quokka",     img:"../images/q_quokka.png",     sound:"../sounds/q_quokka.mp3",     fact:"Quokkan ser alltid ut som om den ler." },
  { letter:"R", name:"Räv",        img:"../images/r_rav.png",        sound:"../sounds/r_rav.mp3",        fact:"Räven har en fluffig svans." },
  { letter:"S", name:"Sköldpadda", img:"../images/s_skoldpadda.png", sound:"../sounds/s_skoldpadda.mp3", fact:"Sköldpaddan bär sitt hus på ryggen." },
  { letter:"T", name:"Tiger",      img:"../images/t_tiger.png",      sound:"../sounds/t_tiger.mp3",      fact:"Tigern har ränder på kroppen." },
  { letter:"U", name:"Uggla",      img:"../images/u_uggla.png",      sound:"../sounds/u_uggla.mp3",      fact:"Ugglan kan se bra i mörker." },
  { letter:"V", name:"Varg",       img:"../images/v_varg.png",       sound:"../sounds/v_varg.mp3",       fact:"Vargen ylar till månen." },
  { letter:"W", name:"Wombat",     img:"../images/w_wombat.png",     sound:"../sounds/w_wombat.mp3",     fact:"Wombaten gräver gångar under marken." },
  { letter:"X", name:"Xerus",      img:"../images/x_xerus.png",      sound:"../sounds/x_xerus.mp3",      fact:"Xerus är en jordekorre från Afrika." },
  { letter:"Y", name:"Yak",        img:"../images/y_yak.png",        sound:"../sounds/y_yak.mp3",        fact:"Yaken har tjock päls för kylan." },
  { letter:"Z", name:"Zebra",      img:"../images/z_zebra.png",      sound:"../sounds/z_zebra.mp3",      fact:"Zebran har svarta och vita ränder." },
  { letter:"Å", name:"Åsna",       img:"../images/aa_asna.png",      sound:"../sounds/aa_asna.mp3",      fact:"Åsnan har långa öron." },
  { letter:"Ä", name:"Älg",        img:"../images/ae_alg.png",       sound:"../sounds/ae_alg.mp3",       fact:"Älgen är Sveriges största djur." },
  { letter:"Ö", name:"Örn",        img:"../images/oe_orn.png",       sound:"../sounds/oe_orn.mp3",       fact:"Örnen flyger högt över skogen." }
];

/* Preload & reuse audio for snappy playback */
const audioMap = new Map();
animals.forEach(a => {
  const el = new Audio(a.sound);
  el.preload = 'auto';
  audioMap.set(a.letter, el);
});

playBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  createCards();
});

function createCards() {
  animals.forEach((animal, index) => {
    const colors = colorPairs[index % colorPairs.length];

    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = animal.letter;
    front.style.color = colors.text;
    front.style.backgroundColor = colors.bg;
    front.style.borderColor = colors.text;

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundColor = '#fff';
    back.style.borderColor = colors.text;

    const img = document.createElement('img');
    img.src = animal.img;
    img.alt = animal.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.draggable = false;

    const nameTag = document.createElement('div');
    nameTag.classList.add('name-tag');
    nameTag.textContent = animal.name;

    const factTag = document.createElement('div');
    factTag.classList.add('fact-text');
    factTag.textContent = animal.fact;

    back.appendChild(img);
    back.appendChild(nameTag);
    back.appendChild(factTag);

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => {
      const isFlipped = card.classList.toggle('flipped');
      if (isFlipped) {
        const audio = audioMap.get(animal.letter);
        if (audio) {
          try { audio.currentTime = 0; audio.play().catch(()=>{}); } catch(_) {}
        }
      }
    });

    document.getElementById('cardContainer').appendChild(card);
  });
}
