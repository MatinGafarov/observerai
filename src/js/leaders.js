const leaders = [
    {
        name: "Binaz Tazon",
        tags: "Astrology, Spiritual Coaching",
        img: "src/assets/images/leader1.png"
    },
    {
        name: "Bora Çakır",
        tags: "Outdoor Skills, Survival",
        img: "src/assets/images/leader2.png"
    },
    {
        name: "Ceyda Fatma Saltadal",
        tags: "Art, Yoga & Movement",
        img: "src/assets/images/leader3.png"
    }
];

const gridLeaders = [];
for (let i = 0; i < 3; i++) {
    gridLeaders.push(...leaders);
}

const grid = document.getElementById('leadersGrid');
gridLeaders.forEach(leader => {
    const card = document.createElement('div');
    card.className = 'leader-card';
    card.innerHTML = `
        <img src="${leader.img}" alt="${leader.name}" class="leader-img">
        <div class="leader-info">
            <div class="leader-name">${leader.name}</div>
            <div class="leader-tags">${leader.tags}</div>
        </div>
    `;
    grid.appendChild(card);
});