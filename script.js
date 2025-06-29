document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultsContainer = document.getElementById('results');

  // 搜索功能函数
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      resultsContainer.innerHTML = '<p>请输入查询内容。</p>';
      return;
    }

    const results = tcmData.filter(item => {
      // 将所有可搜索的文本转为小写进行匹配
      const searchableText = [
        item.pattern,
        item.symptoms.join(' '),
        item.principle,
        item.formulas.map(f => f.name).join(' '),
        item.formulas.map(f => f.herbs.join(' ')).join(' ')
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });

    displayResults(results);
  }

  // 显示结果函数
  function displayResults(results) {
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>未找到相关结果。</p>';
      return;
    }

    let html = '';
    results.forEach(item => {
      html += `
        <div class="result-item">
          <h2>${item.pattern}</h2>
          <p><strong>主症：</strong>${item.symptoms.join('，')}</p>
          <p><strong>舌象：</strong>${item.tongue}</p>
          <p><strong>脉象：</strong>${item.pulse}</p>
          <p><strong>证机概要：</strong>${item.analysis}</p>
          <p><strong>治法：</strong>${item.principle}</p>
          <div><strong>方剂：</strong></div>
          ${item.formulas.map(f => `
            <div>
              <strong>${f.name}</strong> - ${f.usage}<br>
              <small>组成：${f.herbs.join('，')}</small>
            </div>
          `).join('')}
        </div>
      `;
    });
    resultsContainer.innerHTML = html;
  }

  // 绑定事件
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
});