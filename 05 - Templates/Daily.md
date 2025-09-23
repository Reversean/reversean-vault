---
tags:
  - log/daily
creation_date: "{{date}}"
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

## :LiLogs: Дневник

- 

## :LiLink: Ссылки

- 

---

## :LiLayoutDashboard: Daily Dashboard

### :LiNotebookPen: Новые записи

```dataview
list from "Notes"
where file.cday = this.file.cday
```

### :LiBrush: Рисование

```dataviewjs
console.log(`Loading views/daily-arts`);
await dv.view("views/daily-arts", { currentDate: dv.current().creation_date, assetsPath: '04 - Assets/Art' })
```
