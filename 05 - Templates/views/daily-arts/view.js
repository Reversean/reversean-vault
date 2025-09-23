function dailyArts(currentDate, assetsPath) {

    if (!currentDate || typeof currentDate.toFormat != "function") {
        dv.paragraph("⚠ Не указан `creation_date`");
        return;
    }

    const formattedCurrentDate = currentDate.toFormat("yyyy-MM-dd");
    const images = app.vault.getFiles()
        .filter(f => f.parent.path === assetsPath)
        .filter(f => f.name.startsWith(formattedCurrentDate));

    if (images.length === 0) {
        dv.paragraph(":LiBrush: Нет изображений за этот день");
        return;
    }

    const container = dv.el("div", "", { cls: "dv-daily-art-grid" });
    images.forEach(f => {
        const card = document.createElement('div');
        card.className = 'art-card';

        const img = document.createElement('img');
        img.src = app.vault.getResourcePath(f);
        img.alt = f.name;
        card.appendChild(img);

        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.textContent = f.name;
        card.appendChild(caption);

        container.appendChild(card);
    });
}

dailyArts(input.currentDate, input.assetsPath)
