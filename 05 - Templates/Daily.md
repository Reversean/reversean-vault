---
tags:
  - Log
  - Daily
date_created: <% tp.file.creation_date("YYYY-MM-DD") %>
---
## :LiTarget: Цели

### :LiCircleDot: Задачи

- [ ] 

### :LiFolder: Проекты

####

- [ ] 

### :LiBrush: Рисование

- [ ] Контроль стилуса
- [ ] Рисование фигур
- [ ] Рисование жестов

---

## :LiBrain: Мысли

- 

## :LiLink: Ссылки

- 

---

## :LiLogs: Дневник

### :LiNotebookPen: Новые записи

```dataview
list from "Notes"
where file.cday = this.file.cday
```

### :LiFolder: Проекты

```dataview
task from "Tasks"
where contains(file.path, "Projects")
```

### :LiBrush: Рисование

```dataviewjs
const currentFile = dv.current();
const currentFileDateCreated = currentFile.date_created;
if (!currentFileDateCreated || typeof currentFileDateCreated.toFormat != "function") {
	dv.paragraph("⚠ Не указано свойство `date_created`");
} else {
	const currentFileDate = currentFileDateCreated.toFormat("yyyy-MM-dd");
	
	const imagesPath = '04 - Assets/Art';
	const images = app.vault.getFiles()
		.filter(f => f.parent.path === imagesPath)
		.filter(f => f.name.startsWith(currentFileDate));
	if (images.length === 0) {
		dv.paragraph(":LiBrush: Нет изображений за этот день");
	} else {
		if (!document.getElementById('dv-daily-art-style')) {
			const style = document.createElement('style');
			style.id = 'dv-daily-art-style';
			style.textContent = `
			.dv-daily-art-grid{display:grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr)); gap:0.6rem; align-items:start;}
			.dv-daily-art-grid .art-card{border-radius:8px; overflow:hidden; padding:6px; background:var(--background-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.06); display:flex; flex-direction:column;}
			.dv-daily-art-grid img{width:100%; height:auto; display:block; border-radius:6px;}
			.dv-daily-art-grid .caption{font-size:0.85rem; margin-top:6px; text-align:center; color:var(--text-muted); word-break:break-word;}
			`;
			document.head.appendChild(style);
		}
		
		const container = dv.el("div", "", {cls: "dv-daily-art-grid"});
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
}
```