export interface Vouch {
    id: number;
    image: string;
    name: string;
    text: string;
    rotation: number;
}

export const VOUCHES: Vouch[] = [
    {
        id: 1,
        image: "/shitpost-1.jpg", // Placeholder, will need to exist or handle error
        name: "Alex",
        text: "Bro shipped this in 2 days. Insane speed. 🚀",
        rotation: -2,
    },
    {
        id: 2,
        image: "/shitpost-2.jpg",
        name: "Sarah",
        text: "The details on this site are just... chef's kiss 🤌",
        rotation: 1.5,
    },
    {
        id: 3,
        image: "/shitpost-3.jpg",
        name: "David",
        text: "Best portfolio I've seen all year. Seriously.",
        rotation: -1,
    },
    {
        id: 4,
        image: "/shitpost-4.jpg",
        name: "Emily",
        text: "Can I steal your component library? JK... unless? 😳",
        rotation: 3,
    },
    {
        id: 5,
        image: "/avatars/avatar-5.png",
        name: "Mike",
        text: "A 10x engineer who actually cares about design.",
        rotation: -2.5,
    },
];
