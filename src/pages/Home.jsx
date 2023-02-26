import Card from "../components/Card";

function Home({searchValue, setSearchValue, onChangeInput, items, onAddToCart, onAddToFavorite}){
    return(
        <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`: "Все кроссовки"}</h1>
          <div className="search-block d-flex align-center">
            <a href="">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </a>
            {searchValue && <img  className="clear" onClick={() => setSearchValue('')} src="/img/cross.svg" alt="Clear" />}
            <input onChange={onChangeInput} value={searchValue} type="text" placeholder="Поиск..."/>
          </div>
        </div> 
          <div className="d-flex flex-wrap">
          {
            items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) =>
              <Card 
              key={index}
              {...item}
              onPlus={(item) => onAddToCart(item)}
              onAddToFavorite={(item) => onAddToFavorite(item)}
              />
            )
          }
          </div>
      </div>
    )
}

export default Home;