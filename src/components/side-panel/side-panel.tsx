import { useState, useRef } from 'react';
import './side-panel.css';

const weatherInfo = {
    degree: '1',
    image: './public/image/cold.svg',
    weater: 'Снег',
    feelslike: '-3',
    city: 'Москва',
};

interface SearchPanelProps {
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
    searchRef: React.RefObject<HTMLDivElement>;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
    setIsSearch,
    searchRef,
}) => {
    const handleClickClose = () => {
        searchRef.current?.classList.add('slide-out');
        setTimeout(() => {
            setIsSearch(false);
        }, 500);
    };

    return (
        <div ref={searchRef} className="search slide-in">
            <button className="search__close">
                <img
                    onClick={handleClickClose}
                    src="./public/image/close.svg"
                    alt="Закрыть"
                />
            </button>
            <div className="search__wrap">
                <div className="search__city">
                    <img src="./public/image/search.svg" alt="лупа" />
                    <input
                        type="text"
                        className="search__input"
                        placeholder="Москва"
                    />
                </div>
                <button className="search__button">Найти</button>
            </div>
        </div>
    );
};

export const SidePanel = () => {
    const [isSearch, setIsSearch] = useState<boolean>(false);

    const searchRef = useRef<HTMLDivElement | null>(null);

    const handleClickSearch = () => {
        setIsSearch(true);
    };

    return (
        <section className="side">
            {isSearch && (
                <SearchPanel setIsSearch={setIsSearch} searchRef={searchRef} />
            )}
            <img
                className="side__background"
                src="./public/image/side-background.png"
                alt="фон"
            />
            <div className="side__weather">
                <button
                    onClick={handleClickSearch}
                    className="side__search-button"
                >
                    Поиск города
                </button>
                <div className="side__status status">
                    <img
                        className="status__img"
                        src={weatherInfo.image}
                        alt="значок погоды"
                    />
                    <p className="status__degree">
                        {weatherInfo.degree}
                        <span className="status__degree-symbol">°C</span>
                    </p>
                    <p className="status__weather">{weatherInfo.weater}</p>
                    <p className="status__feelslike">{`Ощущается как ${weatherInfo.feelslike} °C`}</p>
                </div>
                <div className="side__bottom">
                    <div className="side__time">
                        <p className="side__time-today">Сегодня</p>
                        {/* тут должна быть библиотека на обработку времени */}
                        <p className="side__time__date">Вс, 13 мар</p>
                    </div>
                    <div className="side__city">
                        <img
                            src="./public/image/location-icon.svg
                        "
                            alt="локация"
                            className="side__city-icon"
                        />
                        <div className="side__city-text">
                            {weatherInfo.city}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
