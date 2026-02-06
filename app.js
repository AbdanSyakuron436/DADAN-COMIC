const qs = new URLSearchParams(location.search);
const id = qs.get("id");
const ch = qs.get("ch");

// HOME
if (document.getElementById("list")) {
  const list = document.getElementById("list");
  const search = document.getElementById("search");

  function render(data) {
    list.innerHTML = "";
    data.forEach(k => {
      list.innerHTML += `
        <a class="card" href="comic.html?id=${k.id}">
          <img src="${k.cover}">
          <div class="info">${k.judul}</div>
        </a>
      `;
    });
  }

  render(KOMIK);

  search.addEventListener("input", () => {
    const keyword = search.value.toLowerCase();
    const filtered = KOMIK.filter(k =>
      k.judul.toLowerCase().includes(keyword)
    );
    render(filtered);
  });
}


// DETAIL KOMIK
if (document.getElementById("comic")) {
  const k = KOMIK[id];
  const div = document.getElementById("comic");

  div.innerHTML = `
    <img src="${k.cover}" style="width:200px">
    <h2>${k.judul}</h2>
    <p>${k.deskripsi}</p>
    <h3>Chapter</h3>
    ${k.chapter.map((c,i)=>`
      <a class="btn" href="read.html?id=${id}&ch=${i}">
        Chapter ${c.judul}
      </a>
    `).join("")}
  `;
}

// BACA KOMIK
if (document.getElementById("reader")) {
  const comic = KOMIK[id];
  const chapter = comic.chapter[ch];
  const reader = document.getElementById("reader");
  const header = document.getElementById("headerInfo");
  const bottom = document.getElementById("bottomNav");

  // HEADER ATAS
  header.innerHTML = `
    <div class="read-header">
      <h2>${comic.judul}</h2>
      <p>Chapter ${chapter.judul}</p>

      <div class="read-nav">
        ${ch > 0 ? `<a href="read.html?id=${id}&ch=${ch-1}">⬅ Prev</a>` : ""}
        <a href="comic.html?id=${id}">Home</a>
        ${ch < comic.chapter.length-1 ? `<a href="read.html?id=${id}&ch=${Number(ch)+1}">Next ➡</a>` : ""}
      </div>
    </div>
  `;

  // ISI KOMIK
  chapter.images.forEach(img => {
    reader.innerHTML += `<img src="${img}">`;
  });

  // NAV BAWAH
  bottom.innerHTML = `
    <div class="bottom-nav">
      ${ch > 0 ? `<a href="read.html?id=${id}&ch=${ch-1}">⬅ Previous</a>` : ""}
      <a href="comic.html?id=${id}">Home</a>
      ${ch < comic.chapter.length-1 ? `<a href="read.html?id=${id}&ch=${Number(ch)+1}">Next ➡</a>` : ""}
    </div>
  `;

  if (ch > 0)
    document.getElementById("prev").href = `read.html?id=${id}&ch=${ch-1}`;
  else
    document.getElementById("prev").style.display="none";

  if (ch < comic.chapter.length-1)
    document.getElementById("next").href = `read.html?id=${id}&ch=${Number(ch)+1}`;
  else
    document.getElementById("next").style.display="none";
}
