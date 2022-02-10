## Projekt Techniki Internetu
Autor: Jakub Kurek

Projekt składa się z aplikacji napisanej w React.js, Typescript, SCSS oraz API napisanego w PHP. Strona służy do zakupu usług ze wcześniej zdefiniowanej puli. 
Dodatkowo istnieje tryb admina, który umożliwia dodawanie, usuwanie i aktualizowanie produktów.


**Dane logowania**
 - Login: admin
 - Hasło: admin

## Proces Zakupu

 1. Dodaj usługi do koszyka
 2. Przejdź do koszyka
 3. Podaj swoje imię
 4. Naciśnij przycisk "Zakup"
 5. Po przekierowaniu należy skopiować link URL, który zawiera klucz dostępowy do danego zamówienia. (w systemie komercyjnym taki link powinien być wysyłany w formie email do użytkownika)

## Autoryzacja
Autoryzacja opiera się na tokenach **JWT** zapisywanych jako Cookie o nazwie "token" (HttpOnly Cookie).
Token domyślnie wygada po 15 minutach od momentu wygenerowania. System nie przewiduje użycia refresh tokenów, dlatego po każdej sesji 15 minutowej należy się ponownie zalogować.

## API
API jest RESTowe. Dostępne endpointy:
| Path | Method |Autoryzacja admina|Opis|
|--|--|--|--|
| /products | `GET`| Nie |List usług|
| /products/`:id` | `GET` |Nie|Pobranie pojedynczego usługi|
| /products/`:id` | `POST` |Tak|Dodanie usługi|
| /products/`:id` | `DELETE` |Tak|Usunięcie usługi|
| /products/`:id` | `PUT`|Tak|Aktualizacja usługi|
|/orders/`:id`?key=[klucz] | `GET`| Nie | Pobranie konkretnego zamówienia|
| /orders/`:id` | `DELETE`|Nie|Usunięcie konkretnego zamówienia|
| /login| `POST`|Nie|Logowanie|
| /logout| `POST`|Nie|Logowanie|
| /auth| `POST`|Tak| Autoryzacja admina (np. przy odświeżeniu strony)|

## Baza danych
Baza MySQL. Zrzut przykładowej bazy znajduje się w pliku **ti.sql**. Wykorzystane tabele:
|Nazwa| Przeznaczenie | Pola|Klucze obce| 
|--|--|--|--|
| products | Tabela usług| `id (PK)`, `name`, `description`, `price`, `duration`, `status` | - |
| orders | Tabela zamówień | `id (PK)`, `client_name`, `date_add`, `access_key`  | - |
|admin_auth| Tabela autoryzacji adminów | `id (PK)`, `login`, `pass`, `token` | - |
| orders_products | Tablea asocjacyjna  produktów dla danego zamówienia |`id (PK)`,`order_id`, `product_id`, `count` | `order_id` -> `orders(id)`, `product_id` -> `products(id)` OBA CASCADE |

## Uruchomienie

Przykładowa strona znajduje się pod adresem: `https://kubaweb2.netsetup.pl/`
Uznałem, że tak będzie najwygodniej.

**Uruchomienie lokalne**
Minimalne wymagania: `PHP > 7.4`(zalecany XAMPP)
 1. Instalacja Yarn (https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
 2. Pobranie repozytorium
 3. Uruchomienie `yarn install`z poziomu folder nadrzędnego
 4. Zdefiniowanie stałej baseURL w pliku ./src/api.tsx (ścieżka musi wskazywać na folder, który zawiera api `np. `http://localhost/techniki/p1/api`)`
 5. Zdefiniowanie stałej API_PATH w pliku ./api/index.php (ścieżka musi wskazywać na folder, który zawiera api, ale bez domeny i na końcu musi być '/' `np. `techniki/p1/api/`)
 6. Zdefiniowanie konfiguracji do bazy danych w pliku ./api/dbController.php (class DB)
 7. Uruchomienie `yarn start` z poziomu folderu nadrzędnego

**Biorąc pod uwagę długą listę kroków wymaganych do uruchomienia serwisu oraz możliwością wystąpienia błędów (np. z zapisem cookies na localhost), zalecam skorzystanie z linka https://kubaweb2.netsetup.pl/**`
