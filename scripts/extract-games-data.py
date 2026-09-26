import json
import os
import re
import time
import requests

INPUT_FILE = "games.txt"
OUTPUT_JSON = "games.json"
OUTPUT_FOLDER = "covers"

SEARCH_URL = "https://store.steampowered.com/api/storesearch/"
DETAILS_URL = "https://store.steampowered.com/api/appdetails"


def sanitize_filename(name):
    """Remove special characters for safe file naming."""
    return re.sub(r'[\\/*?:"<>|]', "", name).strip()


def get_steam_app_id(game_title):
    """Search Steam store API for the game title to find its App ID [Medium Confidence]."""
    params = {"term": game_title, "l": "english", "cc": "US"}
    try:
        response = requests.get(SEARCH_URL, params=params, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("total", 0) > 0:
                first_match = data["items"][0]
                return str(first_match["id"]), first_match["name"]
    except requests.RequestException as err:
        print(f"Network error while searching for {game_title}: {err}")
    return None, None


def get_game_details(app_id):
    """Fetch genres object array and high-resolution library hero image from Steam [High Confidence]."""
    params = {"appids": app_id, "l": "english"}
    genres = []
    
    cover_url = f"https://cdn.cloudflare.steamstatic.com/steam/apps/{app_id}/library_600x900_2x.jpg"

    try:
        response = requests.get(DETAILS_URL, params=params, timeout=10)
        if response.status_code == 200:
            data = response.json()
            # Steam keys the response by an ID that may differ from the requested one
            # (e.g. appids=49520 can come back keyed "224145"), so match by success
            for entry in data.values():
                if isinstance(entry, dict) and entry.get("success"):
                    app_data = entry.get("data") or {}
                    genres = [g["description"] for g in app_data.get("genres", [])]
                    break
    except requests.RequestException as err:
        print(f"Network error fetching details for App ID {app_id}: {err}")

    return genres, cover_url


def download_image(image_url, save_path):
    """Download the vertical cover image [High Confidence]."""
    try:
        res = requests.get(image_url, timeout=10)
        if res.status_code == 200 and len(res.content) > 1000:
            with open(save_path, "wb") as file:
                file.write(res.content)
            return True
    except requests.RequestException:
        pass
    return False


def load_existing_results():
    """Load previously extracted results so already-processed games can be skipped."""
    if os.path.exists(OUTPUT_JSON):
        with open(OUTPUT_JSON, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
        if isinstance(data, list):
            return data
    return []


def process_game_list():
    if not os.path.exists(INPUT_FILE):
        print(f"Error: '{INPUT_FILE}' not found. Please create it and add game titles.")
        return

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        titles = [line.strip() for line in f if line.strip()]

    results = load_existing_results()
    existing_by_title = {r.get("title", "").lower(): r for r in results}
    existing_by_appid = {r.get("appid"): r for r in results}

    print(f"Found {len(titles)} titles to process "
          f"({len(results)} already extracted).\n")

    for title in titles:
        if title.lower() in existing_by_title:
            print(f"Skipping: '{title}' (already extracted)\n")
            continue

        print(f"Processing: '{title}'")
        app_id, matched_name = get_steam_app_id(title)

        if not app_id:
            print(f" -> Result: Not found on Steam.\n")
            continue

        if app_id in existing_by_appid:
            print(f" -> Skipping: already extracted as "
                  f"'{existing_by_appid[app_id].get('title')}'\n")
            continue

        genres, cover_url = get_game_details(app_id)
        
        safe_title = sanitize_filename(matched_name)
        file_path = os.path.join(OUTPUT_FOLDER, f"{app_id}_{safe_title}.jpg")
        image_downloaded = download_image(cover_url, file_path)

        game_entry = {
            "title": matched_name,
            "appid": app_id,
            "cover": file_path if image_downloaded else "",
            "genres": genres
        }
        results.append(game_entry)
        existing_by_title[matched_name.lower()] = game_entry
        existing_by_appid[app_id] = game_entry

        print(f" -> Matched Name: {matched_name}")
        print(f" -> App ID: {app_id}")
        print(f" -> Genres: {genres}")
        print(f" -> Cover Saved: {file_path if image_downloaded else 'Failed/Unavailable'}\n")

        time.sleep(1)

    with open(OUTPUT_JSON, "w", encoding="utf-8") as json_file:
        json.dump(results, json_file, indent=4, ensure_ascii=False)

    print(f"Finished. Extracted data saved to '{OUTPUT_JSON}'.")


if __name__ == "__main__":
    process_game_list()