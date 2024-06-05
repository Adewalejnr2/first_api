const button = document.getElementById('btnSubmit');

button.addEventListener('click', (event) => {
  event.preventDefault(); //stop button from refreshing page/

  const query = document.getElementById('query').value;

  const apiKey = 'd7775092e551443bb38a8f5ed6860f8f';

  const url = `https://newsapi.org/v2/everything?q=${query}`;

  //construct request object//
  const requestObj = {
    method: 'Get',
    headers: {
      Authorization: apiKey,
    },
  };

  fetch(url, requestObj)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      displayResults(data);
    })
    .catch((error) => console.log(error));
});

function displayResults(data) {
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '';

  resultDiv.classList.add('resultDiv');

  if (data.article.length === 0) {
    resultDiv.innerHTML = '<p>No Article Found For Your Keyword</p>';
  }

  //   api fetch styling//

  data.article.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.className = 'articleCard';

    const title = document.createElement('h2');
    title.textContent = article.title;

    title.classList.add('title');

    const descript = document.createElement('p');
    descript.textContent = article.descript;

    const link = document.createElement('a');
    link.href = article.url;
    link.textContent = 'READ MORE';
    link.target = '_blank';

    const img = document.createElement('img');
    img.scr = article.urlToImage;
    img.alt = 'Article Image';
    img.style.width = '100%';

    articleCard.appendChild(title);
    articleCard.appendChild(descript);
    articleCard.appendChild(link);
    articleCard.appendChild(img);

    resultDiv.appendChild(articleCard);
  });
}
