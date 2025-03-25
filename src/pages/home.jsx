import Layout from '../global/layout'
import "./style.scss";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const data = {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
            {
                label: 'Angular',
                data: [60,50,40, 45, 30,38],
                backgroundColor: 'rgb(247, 51, 51)',
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 1,
            },
            {
                label: 'React',
                data: [55, 58, 65, 71, 88, 90],
                backgroundColor: 'rgb(0, 183, 255)',
                borderColor: 'rgb(0, 131, 136)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'REACT VS ANGULAR',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}(Number of users): ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <>
            <Layout>

                <main>
                    <section >
                        <div className="hero">
                        <div className="hero-content">
                            <h2>Hi, This is [Practice React App]</h2>
                            <p>Front End Developer | Building Scalable Web Solutions</p>
                            {/* <a href="#projects" className="cta-button">View My Work</a> */}
                        </div>
                        </div>
                        <div className="graph" style={{ width: '800px' }}><Bar data={data} options={options} /></div>;

                    </section>

                    {/* <div style="width: 800px;"><canvas id="myChart"></canvas></div> */}
                </main>





            </Layout>
        </>
    )
}

export default Home;