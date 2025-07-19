import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { createContext, useContext, useMemo } from 'react';
import { ComponentProps } from '/imports/types/interfaces';

export type AppUserIdModel = string | undefined | null;

interface UserContextType {
    userId: AppUserIdModel;
}

const UserContext = createContext<UserContextType>({
    userId: undefined,
});

export const useUserContext = () => useContext(UserContext);

// this allows you to access the user id site-wide - no refetch needed, no props needed
const UserContextProvider: React.FC<ComponentProps> = ({ children }) => {
    const userId: AppUserIdModel = useTracker(() => Meteor.userId());

    const providerData = useMemo(
        () => ({
            userId,
        }),
        [userId],
    );

    return <UserContext.Provider value={providerData}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
