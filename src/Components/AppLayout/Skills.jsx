import { useEffect, useMemo, useState } from 'react';
import { useThemeContext } from '../../Context/ThemeContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import LoadingIcon from '../LoadingIcon';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Returns the JSX for the chart graphics based off screen size
function SkillsCharts() {
    const {theme} = useThemeContext();
    const widthBreakpoint = 1024, mobileBreakPoint = 640;
    const [largeScreen, setLargeScreen] = useState((window.innerWidth > widthBreakpoint));
    const useLightColors = theme === 'light';
    
    // Data used for setting up the charts
    const chartData = useMemo(() => (
        {
            labels: {
                frontEnd: 'Front-End',
                backEnd: 'Back-End'
            },
            ticks: {
                proficient: 'Proficient',
                comfortable: 'Comfortable',
                knowledgeable: 'Knowledgeable',
                used: 'Used'
            },
            chartTypes: {
                frontEnd: 'frontEnd',
                backEnd: 'backEnd',
                combined: 'combined'
            },
            colors: {
                lightMode: {
                    grid: 'rgba(36, 36, 36, .2)',
                    tick: 'rgb(36, 36, 36)',
                    dataSet1: 'rgba(255, 99, 132, 0.8)',
                    dataSet1Border: 'rgb(255, 97, 107)',
                    dataSet2: 'rgba(54, 162, 235, 0.8)',
                    dataSet2Border: 'rgb(54, 162, 235)'
                },
                darkMode: {
                    grid: 'rgba(185, 185, 185, .2)',
                    tick: 'rgb(185, 185, 185)',
                    dataSet1: 'rgba(255, 99, 132, 0.4)',
                    dataSet1Border: 'rgb(255, 99, 132)',
                    dataSet2: 'rgba(54, 162, 235, 0.4)',
                    dataSet2Border: 'rgb(54, 162, 235)'
                }
            },
            languages: {
                frontEnd: [
                    {'React': 100},
                    {'JavaScript': 100},
                    {'HTML5': 100},
                    {'CSS3': 100},
                    {'Tailwind CSS': 100}
                ],
                backEnd: [
                    {'PHP': 100},
                    {'Next.js': 100},
                    {'TypeScript': 100},
                    {'Java': 75},
                    {'SQL': 100},
                    {'Lua': 50},
                    {'C++': 50},
                    {'C#': 100},
                    {'Python': 75},
                    {'Node.js': 100}
                ]
            }
        }
    ), []);

    // Attaches resize event listener for handling screen size state
    useEffect(() => {
        const handleScreenSize = () => {
            const isLargeScreen = window.innerWidth > widthBreakpoint;

            setLargeScreen(prev => {
                return (prev !== isLargeScreen) 
                    ?  isLargeScreen
                    : prev;
            });
        };
    
        window.addEventListener('resize', handleScreenSize);
    
        return () => window.removeEventListener('resize', handleScreenSize);
    }, []);

    // Returns memoized graphs based on screen size state
    const charts = useMemo(() => {
        // Generates graph object based off of type
        const generateGraph = (type) => {
            const frontEndLabels = chartData.languages.frontEnd.map(skill => Object.keys(skill)[0]);
            const frontEndData = chartData.languages.frontEnd.map(skill => Object.values(skill)[0]);

            const backEndLabels = chartData.languages.backEnd.map(skill => Object.keys(skill)[0]);
            const backEndData = chartData.languages.backEnd.map(skill => Object.values(skill)[0]);

            const dataSet1Bg = useLightColors 
                                ? chartData.colors.lightMode.dataSet1
                                : chartData.colors.darkMode.dataSet1;
            
            const dataSet1Border = useLightColors 
                                    ? chartData.colors.lightMode.dataSet1Border 
                                    : chartData.colors.darkMode.dataSet1Border;

            const dataSet2Bg = useLightColors 
                                ? chartData.colors.lightMode.dataSet2
                                : chartData.colors.darkMode.dataSet2;

            const dataSet2Border = useLightColors 
                                    ? chartData.colors.lightMode.dataSet2Border 
                                    : chartData.colors.darkMode.dataSet2Border;
                                    
            switch (type) {
                case chartData.chartTypes.frontEnd:
                    return {
                        labels: frontEndLabels,
                        datasets: [
                            {
                                label: chartData.labels.frontEnd,
                                data: frontEndData,
                                backgroundColor: [dataSet1Bg],
                                borderColor: [dataSet1Border],
                                borderWidth: 1
                            }
                        ]
                    };
                case chartData.chartTypes.backEnd:
                    return {
                        labels: backEndLabels,
                        datasets: [
                            {
                                label: chartData.labels.backEnd,
                                data: backEndData,
                                backgroundColor: [dataSet2Bg],
                                borderColor: [dataSet2Border],
                                borderWidth: 1
                            }
                        ]
                    };
                case chartData.chartTypes.combined:
                    return {
                        labels: [...frontEndLabels, ...backEndLabels],
                        datasets: [
                            {
                                label: chartData.labels.frontEnd,
                                data: [...frontEndData, ...backEndData.map(() => 0)],
                                backgroundColor: [dataSet1Bg],
                                borderColor: [dataSet1Border],
                                borderWidth: 1
                            },
                            {
                                label: chartData.labels.backEnd,
                                data: [...frontEndData.map(() => 0), ...backEndData],
                                backgroundColor: [dataSet2Bg],
                                borderColor: [dataSet2Border],
                                borderWidth: 1
                            }
                        ]
                    }
                default:
                    break;
            }
        };

        // If on mobile screens, exclude tick text as it takes up too much space
        const handleTickText = (text) => {
            return (window.innerWidth > mobileBreakPoint) ? text : '';
        };
        
        // Options object for the graphs
        const options = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {color: useLightColors ? chartData.colors.lightMode.tick : chartData.colors.darkMode.tick}
                }
            },
            scales: {
                x: {
                    grid: {color: useLightColors ? chartData.colors.lightMode.grid : chartData.colors.darkMode.grid},
                    ticks: {color: useLightColors ? chartData.colors.lightMode.tick : chartData.colors.darkMode.tick},
                    barPercentage: 1
                },
                y: {
                    grid: {color: useLightColors ? chartData.colors.lightMode.grid : chartData.colors.darkMode.grid},
                    ticks: {
                        color: useLightColors ? chartData.colors.lightMode.tick : chartData.colors.darkMode.tick,
                        callback: function(val) {
                            switch (val) {
                                case 100:
                                    return handleTickText(chartData.ticks.proficient);
                                case 75:
                                    return handleTickText(chartData.ticks.comfortable)
                                case 50:
                                    return handleTickText(chartData.ticks.knowledgeable);
                                case 25:
                                    return handleTickText(chartData.ticks.used);
                                default:
                                    return '';
                            }
                        },
                        stepSize: 25,
                        min: 0,
                        max: 100
                    },
                }
            }
        };

        return (largeScreen)
            ? [{ chartGraph: generateGraph(chartData.chartTypes.combined), chartOptions: options }]
            : [
                { chartGraph: generateGraph(chartData.chartTypes.frontEnd), chartOptions: options },
                { chartGraph: generateGraph(chartData.chartTypes.backEnd), chartOptions: options }
            ];
    }, [chartData, largeScreen, useLightColors]);

    return (
        <>
            {charts && (
                <>
                    {!largeScreen && 
                        <>
                            <Bar
                                data={charts[0].chartGraph}
                                options={charts[0].chartOptions}
                            />
                            <Bar
                                data={charts[1].chartGraph}
                                options={charts[1].chartOptions}
                            />
                        </>
                    }
                    {largeScreen && 
                        <Bar
                            data={charts[0].chartGraph}
                            options={charts[0].chartOptions}
                        />
                    }
                </>
            )}
        </>
    );
}


// The "Skills" section of page
export default function Skills() {
    // Used to set mounting state
    const [mounted, setMounted] = useState(false);
    
    // Helps avoid transitioning in component before it is fully mounted
    useEffect(() => setMounted(true), []);

    // Return loading component if not mounted
    if (!mounted) return (<LoadingIcon />);

    return (
        <div id='skills-container' className='h-full w-full my-auto px-8 sm-max:p-4 place-content-center'>
            <div className='m-auto sm-max:w-[90%] sm:w-[80%] lg:w-[80%] 2xl:w-[60%]'>
                <div className="flex flex-col gap-8 m-auto">
                    <div>
                        <h1>Languages</h1>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark">
                            Here is a graphical representation of some of the technologies that I know.
                        </p>
                    </div>
                    <SkillsCharts />
                </div>
            </div>
        </div>
    );
}

// sm-max:w-[90%] sm:w-[80%] lg:w-[80%] 2xl:w-[60%]