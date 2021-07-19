import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
    const [taglist, setTagList] = useState([])
    const [lowerLimit, setLowerLimit] = useState(Number(0))
    const [upperLimit, setUpperLimit] = useState(Number(0))
    const [problemList, setProblemList] = useState([])

    const selectTag = e => {
        // remove duplicates from an array
        const tags = taglist.filter(t => t !== e.target.value)
        setTagList([...tags, e.target.value])
    }

    const changeLowerLimit = e => {
        setLowerLimit(Number(e.target.value))
    }
    const changeUpperLimit = e => {
        setUpperLimit(Number(e.target.value))
    }

    const generateProblemList = async () => {
        if (lowerLimit > upperLimit) {
            alert(
                `Lower limit (${lowerLimit}) is greater than upper limit (${upperLimit})`,
            )
            return
        }
        let tags = ''
        taglist.forEach(tag => {
            tags += tag + ';'
        })
        const url = `https://codeforces.com/api/problemset.problems?tags=${tags}`
        const response = await fetch(url).catch(err => console.log(err))
        const problems = await response.json()
        const op = await problems.result.problems
        const randProbList = []
        for (let i = 0; i < op.length; i++) {
            if (op[i].rating !== undefined) {
                if (
                    (op[i].rating >= lowerLimit &&
                        op[i].rating <= upperLimit) ||
                    lowerLimit === 0 ||
                    upperLimit === 0
                ) {
                    randProbList.push(op[i])
                }
            }
        }
        if (randProbList.length === 0) {
            alert(`No problems found for the given tags`)
        } else {
            const randProb = []
            for (let i = 0; i < 6 && i < randProbList.length; i++) {
                const randomIndex = Math.floor(
                    Math.random() * randProbList.length,
                )
                randProb.push(randProbList[randomIndex])
                randProbList.splice(randomIndex, 1)
            }
            setProblemList(
                randProb.map(p => {
                    const url = `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`
                    return (
                        <a
                            key={p.contestId.toString() + p.index}
                            href={url}
                            target="_blank"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                width: '70%',
                            }}>
                            <div
                                style={{
                                    padding: '1rem',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    borderRadius: '4px',
                                    boxShadow: '0 0 4px 0 rgba(0,0,0,0.15)',
                                    marginBottom: '1.5rem',
                                }}
                                className="problems">
                                <h2 style={{ color: '#0070f3' }}>
                                    {p.index}. {p.name}
                                </h2>
                                <p>
                                    <b>Rating: </b>
                                    {p.rating}
                                </p>
                                <p>
                                    <b>Tags: </b>
                                    {p.tags.map(t => t + ', ')}
                                </p>
                            </div>
                        </a>
                    )
                }),
            )
        }
    }

    return (
        <div className="container">
            <Head>
                <title>CodeForces Upsovler</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Welcome to <a href="/">CodeForces Upsolver</a>
                </h1>
                <h2 style={{ marginTop: '3rem' }}>Rating Range</h2>
                <div className="rating-sel">
                    <input
                        className="rating-field"
                        type="number"
                        value={lowerLimit}
                        onChange={changeLowerLimit}
                    />
                    <span> - </span>
                    <input
                        className="rating-field"
                        type="number"
                        value={upperLimit}
                        onChange={changeUpperLimit}
                    />
                </div>
                <div className="warning">
                    {lowerLimit > upperLimit
                        ? "Upper limit can't be lesser than lower limit"
                        : ''}
                </div>
                <select className="tags" onChange={selectTag} defaultValue="">
                    <option value="" disabled>
                        select your desired tags
                    </option>
                    <option value="2-sat" title="2-satisfiability">
                        2-sat
                    </option>
                    <option value="binary search" title="Binary search">
                        binary search
                    </option>
                    <option value="bitmasks" title="Bitmasks">
                        bitmasks
                    </option>
                    <option value="brute force" title="Brute force">
                        brute force
                    </option>
                    <option
                        value="chinese remainder theorem"
                        title="Сhinese remainder theorem">
                        chinese remainder theorem
                    </option>
                    <option value="combinatorics" title="Combinatorics">
                        combinatorics
                    </option>
                    <option
                        value="constructive algorithms"
                        title="Constructive algorithms">
                        constructive algorithms
                    </option>
                    <option
                        value="data structures"
                        title="Heaps, binary search trees, segment trees, hash tables, etc">
                        data structures
                    </option>
                    <option value="dfs and similar" title="Dfs and similar">
                        dfs and similar
                    </option>
                    <option
                        value="divide and conquer"
                        title="Divide and Conquer">
                        divide and conquer
                    </option>
                    <option value="dp" title="Dynamic programming">
                        dp
                    </option>
                    <option value="dsu" title="Disjoint set union">
                        dsu
                    </option>
                    <option
                        value="expression parsing"
                        title="Parsing expression grammar">
                        expression parsing
                    </option>
                    <option value="fft" title="Fast Fourier transform">
                        fft
                    </option>
                    <option value="flows" title="Graph network flows">
                        flows
                    </option>
                    <option value="games" title="Games, Sprague–Grundy theorem">
                        games
                    </option>
                    <option
                        value="geometry"
                        title="Geometry, computational geometry">
                        geometry
                    </option>
                    <option
                        value="graph matchings"
                        title="Graph matchings, König's theorem, vertex cover of bipartite graph">
                        graph matchings
                    </option>
                    <option value="graphs" title="Graphs">
                        graphs
                    </option>
                    <option value="greedy" title="Greedy algorithms">
                        greedy
                    </option>
                    <option value="hashing" title="Hashing, hashtables">
                        hashing
                    </option>
                    <option
                        value="implementation"
                        title="Implementation problems, programming technics, simulation">
                        implementation
                    </option>
                    <option value="interactive" title="Interactive problem">
                        interactive
                    </option>
                    <option
                        value="math"
                        title="Mathematics including integration, differential equations, etc">
                        math
                    </option>
                    <option
                        value="matrices"
                        title="Matrix multiplication, determinant, Cramer's rule, systems of linear equations">
                        matrices
                    </option>
                    <option
                        value="meet-in-the-middle"
                        title="Meet-in-the-middle">
                        meet-in-the-middle
                    </option>
                    <option
                        value="number theory"
                        title="Number theory: Euler function, GCD, divisibility, etc">
                        number theory
                    </option>
                    <option
                        value="probabilities"
                        title="Probabilities, expected values, statistics, random variables, etc">
                        probabilities
                    </option>
                    <option value="schedules" title="Scheduling Algorithms">
                        schedules
                    </option>
                    <option
                        value="shortest paths"
                        title="Shortest paths on weighted and unweighted graphs">
                        shortest paths
                    </option>
                    <option value="sortings" title="Sortings, orderings">
                        sortings
                    </option>
                    <option
                        value="string suffix structures"
                        title="Suffix arrays, suffix trees, suffix automatas, etc">
                        string suffix structures
                    </option>
                    <option
                        value="strings"
                        title="Prefix- and Z-functions, suffix structures, Knuth–Morris–Pratt algorithm, etc">
                        strings
                    </option>
                    <option value="ternary search" title="Ternary search">
                        ternary search
                    </option>
                    <option value="trees" title="Trees">
                        trees
                    </option>
                    <option value="two pointers" title="Two pointers">
                        two pointers
                    </option>
                </select>
                <h2 style={{ marginBottom: 0 }}>Tag List</h2>
                <ul>
                    {taglist.map(e => <li>{e}</li>).length === 0 ? (
                        <li>No Tags Selected</li>
                    ) : (
                        taglist.map(e => <li key={e}>{e}</li>)
                    )}
                </ul>
                <button className="gen-btn" onClick={generateProblemList}>
                    Generate
                </button>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '3rem',
                    }}>
                    {problemList}
                </div>
            </main>
            <footer>
                <p>&copy; Made by Avaneesh Kumar</p>
            </footer>

            <style jsx>{`
                .problems:hover {
                    border-color: #00bcd4;
                    cursor: pointer;
                }
                .tags {
                    margin-top: 2rem;
                    outline: none;
                    -webkit-appearance: none;
                    background: none;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 0.7rem;
                    width: 60%;
                    font-size: 1.1em;
                    border-radius: 4px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
                }

                .rating-sel {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .rating-field {
                    width: 35%;
                    margin-right: 0.5rem;
                    margin-left: 0.5rem;
                    font-size: 1.2em;
                    outline: none;
                    border: none;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    font-size: 1.2em;
                    padding: 0.7rem;
                    border-radius: 4px;
                    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);
                }

                .gen-btn {
                    margin-top: 1.5rem;
                    width: 60%;
                    border: none;
                    outline: none;
                    background: #0070f3;
                    color: #fff;
                    font-size: 1.1em;
                    border-radius: 4px;
                    padding: 0.7rem;
                    cursor: pointer;
                }

                .warning {
                    margin-top: 1rem;
                    color: red;
                    font-weight: bold;
                }

                .gen-btn:hover {
                    background-color: #0064da;
                }
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
                    padding: 5rem 0;
                    padding-bottom: 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                        monospace;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                .logo {
                    height: 1em;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}
