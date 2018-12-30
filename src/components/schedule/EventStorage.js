import React from 'react';
import {AsyncStorage} from 'react-native';

class EventStorage {

    static storePrefix = '@IvyFilmFestivalStore:';

    static storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(EventStorage.storePrefix + key, JSON.stringify(value));
        } catch (error) {
            // Error saving data
            console.log('Error saving event data');
        }
    };

    static retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(EventStorage.storePrefix + key);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log('Error retrieving data');

        }
    };
}

export default EventStorage;