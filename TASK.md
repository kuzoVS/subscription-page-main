 # VPN Subscription Page — Brutal Minimal Design
# Полное описание дизайна для реализации

---

## СТРОГО ЗАПРЕЩЕНО (применяется ко всей странице)
- NO cyan, teal, или любые синие акцентные цвета (#00b4d8, #06b6d4, #0891b2, #22d3ee и подобные)
- NO box-shadow с цветным свечением на любом элементе
- NO border с цветным свечением (только нейтральные серые #111–#222)
- NO text-transform: uppercase на кнопках (только на двух метках: VPN SERVICE и УСТАНОВКА)
- NO letter-spacing на кнопках
- NO карточки-контейнеры с видимыми рамками вокруг всей секции
- NO градиентные или анимированные рамки
- NO font-size ниже 10px

---

## ФОН СТРАНИЦЫ
```css
background: radial-gradient(ellipse at center bottom, #1a1a1a 0%, #000000 65%);
```
- Градиент идёт снизу по центру — тёмно-серый в центре снизу, чёрный к краям и верху
- Применяется на корневой элемент (body, #root, .page-wrapper)
- НЕ применять на карточки или контейнеры

---

## ХЕДЕР
```
Фон: transparent (наследует фон страницы)
border-bottom: 0.5px solid #1a1a1a
padding: 14px 24px
```

**Левая часть:**
- Строка сверху: текст "VPN SERVICE"
  - font-size: 10px, color: #333, text-transform: uppercase, letter-spacing: 0.12em
- Строка снизу: название сервиса (из конфига)
  - font-size: 14px, font-weight: 500, color: #ffffff

**Правая часть — две кнопки:**
- Кнопка "Получить ссылку":
  - 30×30px, border-radius: 6px
  - background: transparent, border: 0.5px solid #222
  - иконка цвет: #444
- Кнопка Telegram:
  - 30×30px, border-radius: 50% (круглая)
  - background: #16162a, border: 0.5px solid #2a2a45
  - иконка цвет: #6666aa

---

## БЛОК ИНФОРМАЦИИ О ПОДПИСКЕ

### Свёрнутый вид (collapsed)
```
padding: 16px 24px
border-bottom: 0.5px solid #111
background: transparent
БЕЗ рамки вокруг блока
```
- Левая часть:
  - Круглая иконка-чекбокс 20×20px, border: 0.5px solid #222, галочка: #3a6a3a
  - Имя пользователя: font-size: 14px, font-weight: 500, color: #fff
  - Подпись (срок/статус): font-size: 11px, color: #333
- Правая часть:
  - Статус-пилюля: border-radius: 20px, border: 0.5px solid #1a1a1a, font-size: 11px, color: #3a3a3a
  - Стрелка ›: color: #333

### Развёрнутый вид (expanded)
```
padding: 16px 24px
border-bottom: 0.5px solid #111
background: transparent
БЕЗ рамки вокруг блока
```
Сетка 2×2 с полями:
- Метка поля: font-size: 10px, color: #333, text-transform: uppercase, letter-spacing: 0.08em
- Значение поля: font-size: 13px, font-weight: 500, color: #fff
- Иконка поля: 14×14px, color: #333
- Разделители между полями: border-bottom: 0.5px solid #0f0f0f

---

## СЕКЦИЯ УСТАНОВКИ

### Заголовок секции
```
padding: 16px 24px 12px
БЕЗ рамки вокруг секции
border-top: 0.5px solid #111 (разделитель от блока выше)
```
- Левая часть: текст "УСТАНОВКА"
  - font-size: 11px, color: #333, text-transform: uppercase, letter-spacing: 0.12em
- Правая часть — OS селектор:
  - border-radius: 20px, border: 0.5px solid #1a1a1a, background: transparent
  - font-size: 11px, color: #444
  - Иконка ОС (14×14px, color: #333) + название ОС + chevron вниз (8×8px, color: #333)

### Табы приложений
```
display: flex, gap: 6px
padding: 0 24px 12px
```
Каждый таб:
- border-radius: 20px, padding: 5px 14px
- display: flex, align-items: center, gap: 6px
- Иконка приложения: 16×16px (оригинальная svg иконка из конфига svgIconKey)
- Текст: app.name из конфига — font-size: 12px

Активный таб:
- background: #ffffff, color: #000000, font-weight: 500
- Иконка: оригинальные цвета или stroke: #000

Неактивный таб:
- background: transparent, border: 0.5px solid #1a1a1a, color: #aaaaaa
- Иконка: stroke/fill: #555

---

## ШАГИ УСТАНОВКИ — ВАРИАНТ TIMELINE

### Контейнер шагов
```
padding: 0 24px
БЕЗ внешней рамки вокруг всего блока шагов
```

### Каждый шаг
```
display: flex, gap: 14px
padding: 14px 0
border-bottom: 0.5px solid #0f0f0f
последний шаг: border-bottom: none
```

**Левая колонка (иконка + линия):**
- Иконка шага: 32×32px, border-radius: 8px, background: #0a0a0a, border: 0.5px solid #1a1a1a
- Все иконки одного нейтрального стиля: stroke: #444 — игнорировать svgIconColor из конфига
- Завершённый шаг (Check): border-color: #1a3a1a, галочка stroke: #3a6a3a
- Вертикальная линия под иконкой: width: 0.5px, background: #111, flex: 1, margin-top: 4px
- У последнего шага линии нет

**Правая колонка (текст):**
- Заголовок: font-size: 12px, font-weight: 500, color: #cccccc
- Описание: font-size: 11px, color: #333333, line-height: 1.6, margin-bottom: 10px

**Кнопки в шаге:**
- border-radius: 20px (pill)
- border: 0.5px solid #1a1a1a, background: transparent
- font-size: 11px, color: #555555
- Основная кнопка (скачать/установить): border-color: #222, color: #888888
- Иконка внутри кнопки: 11×11px слева от текста
- Текст как в конфиге — sentence case, НИКОГДА не ALL CAPS

---

## ШАГИ УСТАНОВКИ — ВАРИАНТ CARDS

### Контейнер шагов
```
padding: 0 24px
display: flex, flex-direction: column, gap: 8px
БЕЗ внешней рамки вокруг всего блока
```

### Каждая карточка шага
```
background: #0a0a0a
border: 0.5px solid #1a1a1a
border-radius: 8px
padding: 14px 16px
display: flex, gap: 14px
БЕЗ box-shadow
```

**Иконка шага:**
- 32×32px, border-radius: 8px, background: #111111, border: 0.5px solid #1a1a1a
- Все иконки: stroke: #444 — игнорировать svgIconColor из конфига
- Завершённый шаг: border-color: #1a3a1a, галочка stroke: #3a6a3a

**Текст:**
- Заголовок: font-size: 12px, font-weight: 500, color: #cccccc
- Описание: font-size: 11px, color: #333333, line-height: 1.6

**Кнопки:**
- border-radius: 20px (pill)
- border: 0.5px solid #1a1a1a, background: transparent
- font-size: 11px, color: #555555
- Текст sentence case — НИКОГДА не ALL CAPS
- text-transform: none !important
- letter-spacing: normal !important

---

## ИКОНКА ЯЗЫКА (внизу страницы)
- Глобус SVG, 20×20px
- opacity: 0.15
- display: block, margin: 24px auto 0
- Без текста, без рамки, без фона

---

## ТИПОГРАФИКА (общие правила)
- Font stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Основной текст: #ffffff, font-weight: 400–500
- Второстепенный: #333333–#555555
- Два исключения для uppercase: метка "VPN SERVICE" в хедере и метка "УСТАНОВКА" в секции
- Все остальные тексты — sentence case как написано в конфиге

---

## ПАЛИТРА ЦВЕТОВ (только эти цвета, никаких других)
| Назначение | Цвет |
|---|---|
| Фон страницы | #000000 + градиент |
| Фон карточек | #0a0a0a |
| Фон иконок шагов | #111111 |
| Основные границы | #1a1a1a |
| Акцентные границы | #222222 |
| Разделители | #0f0f0f–#111111 |
| Текст основной | #ffffff |
| Текст заголовков шагов | #cccccc |
| Текст описаний | #333333 |
| Текст кнопок | #555555–#888888 |
| Метки полей | #333333 |
| Иконки | #444444 |
| Telegram кнопка фон | #16162a |
| Telegram кнопка граница | #2a2a45 |
| Telegram иконка | #6666aa |
| Галочка активна | #3a6a3a |
| Граница завершён | #1a3a1a |

---

## ЧТО ИЗМЕНИТЬ В КОДЕ (чеклист)

1. **global.css / page wrapper** — заменить background на радиальный градиент снизу
2. **Все CSS модули кнопок** — удалить text-transform: uppercase и letter-spacing, добавить border-radius: 20px
3. **installation-guide контейнер** — убрать border и box-shadow полностью
4. **subscription-info контейнер** — убрать border и box-shadow, оставить только border-bottom
5. **timeline-block / cards-block** — иконки шагов игнорируют svgIconColor, всегда stroke: #444
6. **Таб компонент** — рядом с иконкой обязательно рендерить {app.name}, color для неактивных: #aaaaaa
7. **OS селектор** — border-radius: 20px, убрать cyan цвет
8. **Хедер** — добавить строку "VPN SERVICE" над названием
9. **cards-block карточки** — border: 0.5px solid #1a1a1a, убрать box-shadow
