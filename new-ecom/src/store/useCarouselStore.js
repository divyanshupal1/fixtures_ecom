import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';

const sortCarousels = (carousels) => {
    return Object.keys(carousels)
        .sort((a, b) => carousels[a].carouselName.localeCompare(carousels[b].carouselName))
        .reduce((acc, key) => {
            acc[key] = carousels[key];
            return acc;
        }, {});
};

export const useCarouselStore = create((set) => ({
    carousels: undefined,
    fetchCarousels: async () => {
        try {
            const res = await axiosInstance.get('/ecommerce/carousel');
            if (res.data.success) {
                const carousels = res.data.data.reduce((acc, curr) => {
                    const { _id } = curr;
                    acc[_id] = curr;
                    return acc;
                }, {});
                const sortedCarousels = sortCarousels(carousels);
                set({ carousels: sortedCarousels });
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    },
}));
