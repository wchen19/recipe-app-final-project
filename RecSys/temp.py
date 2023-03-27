import json
import requests

# Replace this with the actual URL of your API endpoint
API_URL = "http://localhost:3000/recipe"

# Replace this with the actual path where you want to save the JSON file
OUTPUT_FILE = "./images.json"

# Get the image names from the API
response = requests.get(API_URL)
image_names = response.json()

# Create a dictionary of image mappings
image_mapping = {}
for name in image_names:
    image_mapping[name['image_name']] = f"require('{name['image_name']}')"


# Write the image mappings to a JSON file
with open(OUTPUT_FILE, "w") as f:
    json.dump(image_mapping, f)
