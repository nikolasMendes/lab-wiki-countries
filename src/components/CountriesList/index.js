import { Link } from 'react-router-dom';

function CountriesList({ country }) {
  return (
    <>
      <Link
        to={`/${country.alpha3Code}`}
        className="list-group-item list-group-item-action"
      >
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
          alt="flag"
        />
        {country.alpha3Code}
      </Link>
    </>
  );
}

export default CountriesList;
