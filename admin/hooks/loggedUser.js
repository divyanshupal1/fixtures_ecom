import { useState, useEffect } from 'react';
import {USER_ROUTE} from "@/constants";

const useCurrentUser = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(USER_ROUTE+"/current-user");
                if (!response.ok) {
                    throw new Error('Unable to fetch current user');
                }
                const user = await response.json();
                setCurrentUser(user.data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return { currentUser, isLoading };
};

export default useCurrentUser;
