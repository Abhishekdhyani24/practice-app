import Layout from '../global/layout'
import "./style.scss";

const Home = () => {


    return (
        <>
            <Layout>
        
                    {/* <header>
                        <nav>
                            <ul>
                                <li><a href="#about">About</a></li>
                                <li><a href="#projects">Projects</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </nav>
                    </header> */}

                    <main>
                        <section className="hero">
                            <div className="hero-content">
                                <h2>Hi, This is [Practice React App]</h2>
                                <p>Front End Developer | Building Scalable Web Solutions</p>
                                {/* <a href="#projects" className="cta-button">View My Work</a> */}
                            </div>
                        </section>
                    </main>

             

            </Layout>
        </>
    )
}

export default Home;