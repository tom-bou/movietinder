import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import LikedMoviesView from '../views/likesView';
import { useNavigate } from 'react-router-dom';
import { toJS } from 'mobx';
import { useSelector } from 'react-redux';


export default
observer( 
    function LikesPresenter(props) {
        const [likedMovies, setLikedMovies] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [currentMovie, setCurrentMovie] = useState(null);
        const [sessionLikes, setSessionLikes] = useState([]);
        const [showSessionLikes, setShowSessionLikes] = useState(false);

        const userId = useSelector((state) => state.user.details.userId);
        const sessionId = useSelector((state) => state.session.sessionId);

        const navigate = useNavigate();

        const goToSwipe = () => {
            navigate("/moviepage");
        }
        function windowToStartPage() {
        navigate("/");
        }
        
        useEffect(() => {
        const fetchMovies = async (userId) => {
            try {
            const likedMoviesIds = await props.firebaseModel.getLikedMovies(userId);
    
            const promises = likedMoviesIds.map((movieId) => props.model.doMovieSearch(movieId));
            let movies = await Promise.all(promises.map(result => result.promise));
            movies = movies.map(movie => toJS(movie));
    
    
            return movies
            } catch (error) {
            console.error("Failed to fetch movies:", error);
            }
        };
    
    
        const fetchMoviesAndSetState = async () => {
            const movies = await fetchMovies(userId);
            setLikedMovies(movies);
        };
    
        fetchMoviesAndSetState();
    
        const fetchSessionLikes = async (sessionId) => {
            const members = await props.firebaseModel.getSessionMembers(sessionId);
    
            // Use 'members' for computations
            let memberLikes = members.map((member) => fetchMovies(member));
            let likesArrays = await Promise.all(memberLikes);
    
            const intersection = likesArrays.reduce((accumulator, currentArray) => {
            return accumulator.filter(accElement =>
                currentArray.some(currElement => currElement.id === accElement.id)
            );
            }, likesArrays[0] || []);
    
            // 'intersection' now contains the common elements between all member likes
            setSessionLikes(intersection);
            // Update state at the end
            if (members.length > 1) setShowSessionLikes(true);
    
        }
    
    
        if (sessionId) {
            fetchSessionLikes(sessionId);
    
        }
        }, [props.firebaseModel, props.model, userId, sessionId]);
        
    return (
        <div>
            <LikedMoviesView
                likedMovies={likedMovies}
                sessionLikes={sessionLikes}
                showSessionLikes={showSessionLikes}
                goToSwipe={goToSwipe}
                goToStart={windowToStartPage}
                firebaseModel={props.firebaseModel}
                model={props.model}
/>
        </div>
        );


});


