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
    const
        gridLight = 'rgba(36, 36, 36, .2)',
        tickLight = 'rgb(36, 36, 36)',
        dataSet1Light = 'rgba(255, 99, 132, 0.8)',
        dataSet1BorderLight = 'rgb(255, 97, 107)',
        dataSet2Light = 'rgba(54, 162, 235, 0.8)',
        dataSet2BorderLight = 'rgb(54, 162, 235)',
        gridDark = 'rgba(185, 185, 185, .2)',
        tickDark = 'rgb(185, 185, 185)',
        dataSet1Dark = 'rgba(255, 99, 132, 0.4)',
        dataSet1BorderDark = 'rgb(255, 99, 132)',
        dataSet2Dark = 'rgba(54, 162, 235, 0.4)',
        dataSet2BorderDark = 'rgb(54, 162, 235)';


    // Attatches resize event listener for handeling screen size state
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
            const 
                frontEndLabels = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
                frontEndData = [100, 100, 100, 100, 75],
                backEndLabels = ['PHP', 'Java', 'SQL', 'PL/SQL', 'C++', 'Python', 'Node.js'],
                backEndData = [100, 75, 75, 25, 50, 75, 100];


            switch (type) {
                case 'frontEnd':
                    return {
                        labels: frontEndLabels,
                        datasets: [
                            {
                                label: 'Front-End',
                                data: frontEndData,
                                backgroundColor: [(theme === 'light') ? dataSet1Light : dataSet1Dark],
                                borderColor: [(theme === 'light') ? dataSet1BorderLight : dataSet1BorderDark],
                                borderWidth: 1
                            }
                        ]
                    };
                case 'backEnd':
                    return {
                        labels: backEndLabels,
                        datasets: [
                            {
                                label: 'Back-End',
                                data: backEndData,
                                backgroundColor: [(theme === 'light') ? dataSet2Light : dataSet2Dark],
                                borderColor: [(theme === 'light') ? dataSet2BorderLight : dataSet2BorderDark],
                                borderWidth: 1
                            }
                        ]
                    };
                case 'combined':
                    return {
                        labels: [...frontEndLabels, ...backEndLabels],
                        datasets: [
                            {
                                label: 'Front-End',
                                data: [...frontEndData, ...backEndData.map(() => 0)],
                                backgroundColor: [(theme === 'light') ? dataSet1Light : dataSet1Dark],
                                borderColor: [(theme === 'light') ? dataSet1BorderLight : dataSet1BorderDark],
                                borderWidth: 1
                            },
                            {
                                label: 'Back-End',
                                data: [...frontEndData.map(() => 0), ...backEndData],
                                backgroundColor: [(theme === 'light') ? dataSet2Light : dataSet2Dark],
                                borderColor: [(theme === 'light') ? dataSet2BorderLight : dataSet2BorderDark],
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
                    labels: {color: (theme === 'light') ? tickLight : tickDark}
                }
            },
            scales: {
                x: {
                    grid: {color: (theme === 'light') ? gridLight : gridDark},
                    ticks: {color: (theme === 'light') ? tickLight : tickDark},
                    barPercentage: 1
                },
                y: {
                    grid: {color: (theme === 'light') ? gridLight : gridDark},
                    ticks: {
                        color: (theme === 'light') ? tickLight : tickDark,
                        callback: function(val) {
                            switch (val) {
                                case 100:
                                    return handleTickText('Proficient');
                                case 75:
                                    return handleTickText('Comfortable')
                                case 50:
                                    return handleTickText('Knowledable');
                                case 25:
                                    return handleTickText('Used');
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
            ? [{ chartGraph: generateGraph('combined'), chartOptions: options }]
            : [
                { chartGraph: generateGraph('frontEnd'), chartOptions: options },
                { chartGraph: generateGraph('backEnd'), chartOptions: options }
            ];
    }, [largeScreen, theme]);

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
        <div id='skills-container' className='h-full w-full place-content-center'>
            <div className='m-auto sm-max:w-[90%] sm:w-[80%] lg:w-[80%] 2xl:w-[60%]'>
                <div className="flex flex-col gap-8 m-auto">
                    <div>
                        <h1>Languages</h1>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark">
                            Here is a graphical representation of languages that I know.
                        </p>
                    </div>
                    <SkillsCharts />
                </div>
            </div>
        </div>
);
}

// sm-max:w-[90%] sm:w-[80%] lg:w-[80%] 2xl:w-[60%]