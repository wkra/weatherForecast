# weatherForecast

<a href="https://wkra.github.io/weatherForecast/dist/">DEMO</a>

### Opis funkcjonalności:
Aplikacja pozwala na pobranie aktualnego stanu pogody z 7 predefiniowanych lokalizacji (Tokio, Paryż, Oslo, Rzym, Londyn, Warszawa, Barcelona) z bazy MetaWeather API. Predefiniowane lokalizacje mają w tle flagę kraju. Aplikacja umożliwia również wyświetlenie aktualnej pogody w wybranej przez użytkownika lokalizacji po uwczesnym sprawdzeniu czy lokalizacja znajduje się w bazie MetaWeather API. Wyświetlane miejsca mają domyślne tło. 

### Napotkane problemy:
Problemem okazało się pobranie danych z bazy MetaWeather API (pomimo próby ominięcia błędu cross-origin). Rozwiązaniem było usunięcie właściwości "data", oraz wpisanie przed podany url "https://crossorigin.me/".

### Uzasadnienie wyboru dodatkowych bibliotek:
- jQuery - biblioteka wybrana z powodu wygodniejszego wykonywania operacji na elementach html oraz połączenia ajax.
- bootstrap - wykorzystanie containera, stylowanie css
- parallax.js - płynniejsze działanie efektu scrollowania tła
