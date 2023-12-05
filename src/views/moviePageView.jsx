import "../style.css"

function MoviePageView(props) {
    return (
        <div className="flex min-h-screen bg-custom-purple">
            <div className="p-1 flex-column w-1/2"> {/* Leftmost column */}
                <div className="h-2/3 flex items-center justify-center p-6"> {/* Upper left */}
                    <div className="h-full w-full">
                    <img
                    className="m-auto max-h-full poster-edge-gradient"
                    src="https://media-cache.cinematerial.com/p/500x/a8kz1ivq/65-movie-poster.jpg?v=1671028334"
                    alt="Movie poster"/>
                    </div>
                </div>
                <div className="h-1/3"> {/* Lower left */}
                    <div className="flex justify-center items-start space-x-6 p-5">
                        <button className="bg-red-500 w-20 h-20 rounded-lg aspect-square">Don't like</button>
                        <button className="bg-blue-500 w-20 h-20 rounded-lg aspect-square">View trailer</button>
                        <button className="bg-green-500 w-20 h-20 rounded-lg aspect-square">Like</button>
                    </div>
                </div>
            </div>
            <div className="p-1 flex-column w-1/2"> {/* Rightmost column */}
                <div className="h-16 flex justify-end p-5"> {/* Upper right */}
                    <button className="shadow-red-glow text-red-500 text-xl">Your likes</button>
                </div>
                <div className="h-1/2 flex m-auto p-2.5"> {/* Middle right */}
                    <div className="w-full h-full grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 m-auto">
                            <p className="shadow-white-glow text-category-title">Title</p>
                            <p className="text-category-body">65</p>
                        </div>
                        <div className="p-2 m-auto">
                            <p className="shadow-white-glow text-category-title">Genre</p>
                            <p className="text-category-body">Science Fiction</p>
                        </div>
                        <div className="p-2 m-auto">
                            <p className="shadow-white-glow text-category-title">Actors</p>
                            <p className="text-category-body">Adam Driver, Another Actor, And One More Actor</p>
                        </div>
                        <div className="p-2 m-auto">
                            <p className="shadow-white-glow text-category-title">Directors</p>
                            <p className="text-category-body">Scott Beck, Bryan Woods</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4"> {/* Lower right */}
                    <p className="text-center text-category-title">Storyline</p>
                    <p className="text-white text-md">After a catastrophic crash, pilot Mills quickly discovers he's actually stranded on an unknown planet. Now, with only one chance at rescue, Mills must make his way across an unknown terrain riddled with dangerous prehistoric creatures in an epic fight to survive. From the writers of A Quiet Place comes 65, a sci-fi thriller produced by Sam Raimi, Deborah Liebling, Zainab Azizi, Scott Beck and Bryan Woods</p>
                </div>
            </div>
        </div>
    );
}

export default MoviePageView;