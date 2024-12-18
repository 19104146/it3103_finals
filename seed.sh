#!/bin/bash

CRM_API_URL="http://localhost:8001/legacy/Api/V8/module"

user_names=(
    "Chou Tzuyu"
    "Lee Dahyun"
    "Nadine Lee"
    "Go Min Si"
    "Yoon Bora"
    "Son Chaeyoung"
    "Carlo Juab"
    "Xander Labide"
    "Ean Velayo"
    "Spongebob Squarepants"
)

for name in "${user_names[@]}"; do
    json_body=$(jq -n --arg name "$name" '{
        data: {
            type: "Accounts",
            attributes: {
                name: $name
            }
        }
    }')

    response=$(curl -s -X POST "$CRM_API_URL" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $CRM_API_KEY" \
        -d "$json_body")

    echo "Response for $name: $response"
done
