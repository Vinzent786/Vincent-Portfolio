// Provides a loading component while the page loads
export default function LoadingIcon() {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center w-5/6 m-auto">
            <p className="text-xl text-center font-anton w-full">
                Loading            
                <svg className="inline ml-2 w-[100px] h-[15px]" viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                    <circle cx="15" cy="10" r="8">
                        <animate attributeName="r" from="8" to="8" begin="0s" dur="0.6s" values="8;4;8" calcMode="linear" repeatCount="indefinite" />
                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.6s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                    </circle>
                    <circle cx="45" cy="10" r="8">
                        <animate attributeName="r" from="8" to="8" begin="0.2s" dur="0.6s" values="8;4;8" calcMode="linear" repeatCount="indefinite" />
                        <animate attributeName="fill-opacity" from="1" to="1" begin="0.2s" dur="0.6s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                    </circle>
                    <circle cx="75" cy="10" r="8">
                        <animate attributeName="r" from="8" to="8" begin="0.4s" dur="0.6s" values="8;4;8" calcMode="linear" repeatCount="indefinite" />
                        <animate attributeName="fill-opacity" from="1" to="1" begin="0.4s" dur="0.6s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                    </circle>
                </svg>
            </p>
        </div>
    );
}
