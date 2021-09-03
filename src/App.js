import React, { useState, useEffect, Fragment } from 'react'
import './App.css';
function Container() {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [nameInfos, setNameInfos] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [infos, setInfos] = useState([]);
  const [search, setSearch] = useState("Cambodia");
  const [enter, setEnter] = useState("");
  const style = {
    nav: {
      background: toggle ? "#fff" : "#20232a",
      color: toggle ? "#000" : "#fff",
      borderBottom: toggle ? "0.01em solid #e0e0e0" : "none"
    },
    href: {
      textDecoration: "none",
      color: toggle ? "#000" : "#fff"
    },
    line: {
      background: toggle ? "#000" : "#fff"
    },
    darklight: {
      border: toggle ? "0.1em solid #222" : "0.1em solid #fff",
      borderRadius: "30px"
    },
    container: {
      background: toggle ? "#fff" : "#282c34",
      color: toggle ? "#000" : "#fff",
      overflow: show ? "hidden" : "none",
    },
    name: {
      background: toggle ? "#fff" : "#20232a",
      transform: show ? "translateX(0%)" : "translateX(-100%)",
      boxShadow: "0"
    },
    close: {
      background: toggle ? "#000" : "#fff"
    },
    data: {
      background: toggle ? "#eee" : "#282c34"
    },
    searchName: {
      background: toggle ? "#eee" : "#282c34",
      color: toggle ? "#000" : "#fff"
    },
    input: {
      border: toggle ? "0.1em solid #e0e0e0" : "0.1em solid #e0e0e0",
      color: toggle ? "#000" : "rgb(159 207 239)"
    },
    button: {
      border: toggle ? "0.15em solid #e0e0e0" : "0.15em solid #e0e0e0",
      color: toggle ? "#000" : "rgb(159 207 239)"
    },
    clearInput: {
      color: "rgb(255, 186, 0)",
      cursor: "pointer",
      display: search !== "" ? "block" : "none"
    },
    information: {
      borderBottom: toggle ? "0.1px solid #e0e0e0" : "0.1px solid #3c424e",
    },
    infos: {
      color: toggle ? "#555" : "rgb(159,207,239)"
    },
    copyright: {
      background: toggle ? "#eee" : "#282c34"
    }
  }
  useEffect(() => {
    async function countryName() {
      const res = await fetch(`https://restcountries.eu/rest/v2/all`);
      return res.json().then((data) => {
        setNameInfos(data);
      }).catch((err) => {
        return err;
      })
    }
    countryName();
  }, []);
  useEffect(() => {
    setFilteredCountries(
      nameInfos.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, nameInfos]);
  useEffect(() => {
    async function countryInfos() {
      const res = await fetch(`https://restcountries.eu/rest/v2/name/${search}`);
      return res.json().then((data) => {
        setInfos(data);
      }).catch((err) => {
        if (err) {
          alert(`${enter} not found!`);
          window.location.reload();
        }
      })
    }
    countryInfos();
  }, [enter]);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setEnter(search);
  }
  function clearInput() {
    setSearch('');
    setInfos([]);
  }
  return (
    <main className="container" style={style.container}>
      <nav style={style.nav}>
        <div className="logo">
          <h1><a href="../public/index.html" style={style.href}>ACIS</a></h1>
        </div>
        <div className="menu">
          <div className="dark-light" style={style.darklight}>
            <p onClick={() => {
              setToggle(!toggle);
            }}>{toggle ? "☀️ Light Mode" : "🌙 Dark Mode"}</p>
          </div>
          <div className="all" onClick={() => {
            setShow(!show);
          }}>
            <p>All</p>
            <div className="lines">
              <div className="line" style={style.line}></div>
              <div className="line" style={style.line}></div>
              <div className="line" style={style.line}></div>
            </div>
          </div>
        </div>
      </nav>
      <section className="name" style={style.name}>
        <div className="title">
          <h1>Country names</h1>
          <div className="closes" onClick={() => setShow(!show)}>
            <div className="close" style={style.close}></div>
            <div className="close" style={style.close}></div>
            <div className="close" style={style.close}></div>
          </div>
        </div>
        <div className="filter">
          <input type="text" value={filter} placeholder="Search country names..." onChange={e => {
            setFilter(e.target.value);
          }} style={style.searchName} />
          {filteredCountries.map((data, index) => {
            return (
              <div key={index} className="data" style={style.data} onClick={() => {
                setSearch(data.name);
                setEnter(search);
                setShow(!show);
              }}>
                <img src={data.flag} width="40px" height="30px" alt={data.name} />
                <p>{data.name}</p>
              </div>
            )
          })}
        </div>
        <div className="copyright" style={style.copyright}>
          <div className="image"></div>
          <p>© 2021 developed by <a href="mailto:pagnavathcoding@gmail.com" style={{ color: "rgb(255, 186, 0)", textDecoration: "none" }}>Pagnavath</a>.</p>
        </div>
      </section>
      <section className="center">
        <div className="enter">
          <p>Input country names</p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." value={search} onChange={handleChange} style={style.input} />
            <button type="submit" style={style.button}>🔎</button>
          </form>
          <p style={style.clearInput} onClick={clearInput}>Clear Input</p>
        </div>
        <div>
          {
            infos.map((data, idx) => {
              return (
                <div key={idx} className="infos">
                  <div class="left">
                    <img src={data.flag} alt={data.name} />
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Country: </p>
                      <h1>{data.name}</h1>
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Region: </p>
                      <h1>{data.region}</h1>
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Population: </p>
                      <h1>{data.population.toLocaleString()}</h1>
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Capital: </p>
                      <h1>{data.capital === '' ? "None" : data.capital}</h1>
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Area: </p>
                      <h1>{data.area.toLocaleString()} Km<sup>2</sup></h1>
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Native name: </p>
                      <h1>{data.nativeName}</h1>
                    </div>
                    <div className="information" style={style.information} id="sub">
                      <p style={style.infos}>Subregion: </p>
                      <h1>{data.subregion}</h1>
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Top Level Domain: </p>
                      <h1>{data.topLevelDomain}</h1>
                    </div>
                  </div>
                  <div class="right">
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Calling codes: </p>
                      <h1>+ {data.callingCodes}</h1>
                    </div>
                    <div className="information" id="curen" style={style.information}>
                      <p style={style.infos}>{data.currencies.length <= 1 ? "Currency:" : "Currencies:"}</p>
                      <div className="currency">
                        {
                          data.currencies.map((cur, index) => {
                            return (
                              <div className="cur" key={index}>
                                <p>{cur.code}</p>
                                <p>{cur.name}</p>
                                <p>{cur.symbol}</p>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="information" id="lang" style={style.information}>
                      <p style={style.infos}>Languages: </p>
                      <div className="lang">
                        <div className="lang-name">
                          <p>Name: </p>
                          <h1>{data.languages[0].name}</h1>
                        </div>
                        <div className="lang-native">
                          <p>Native name: </p>
                          <h1>{data.languages[0].nativeName}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="information" id="border" style={style.information}>
                      <p style={style.infos}>Borders: </p>
                      <div className="border">
                        {
                          data.borders.length < 1 ? <p>None</p> : data.borders.map((bor, index) => {
                            return <p key={index}>{bor}</p>
                          })
                        }
                      </div>
                    </div>
                    <div className="information" id="lang" style={{
                      borderBottom: toggle ? "0.1px solid #e0e0e0" : "0.1px solid #3c424e", flexDirection: data.regionalBlocs.length < 1 ? "row" : "column"
                    }}>
                      <p style={style.infos}>Regional Blocs: </p>

                      {
                        data.regionalBlocs.length < 1 ? <p style={{ marginLeft: "0.5em" }}>None</p> : data.regionalBlocs.map((data, index) => {
                          return (
                            <div className="lang" key={index}>
                              <div className="lang-name">
                                <p>Acronym: </p>
                                <h1>{data.acronym}</h1>
                              </div>
                              <div className="lang-native">
                                <p>Name: </p>
                                <h1>{data.name}</h1>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Numeric code: </p>
                      <h1>{data.numericCode}</h1>
                    </div>
                    <div className="information" style={style.information}>
                      <p style={style.infos}>Gini index: </p>
                      <h1>{data.gini === null ? "None" : data.gini}</h1>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="err" style={{ display: search === "" ? "flex" : "none" }}>
          <h1>🔥🤲🏼🔥</h1>
        </div>
      </section>
      <footer>
        <p>© 2021 | developed by <a href="mailto:pagnavathcoding@gmail.com" style={{ color: "rgb(255, 186, 0)", textDecoration: "none" }}>Pagnavath</a>, All rights reserved.</p>
      </footer>
    </main >
  )
}
function App() {
  return (
    <Fragment>
      <Container />
    </Fragment>
  )
}
export default App;