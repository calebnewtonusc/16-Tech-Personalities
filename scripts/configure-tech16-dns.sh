#!/bin/bash

# Configure DNS for 16techpersonalities.com in GoDaddy

# Load credentials
source /Users/joelnewton/Desktop/.godaddy-credentials

DOMAIN="16techpersonalities.com"
VERCEL_IP="76.76.21.21"

echo "[wrench.fill] Configuring DNS for $DOMAIN"
echo ""

# Function to add/update A record
add_a_record() {
    local NAME=$1
    local IP=$2

    echo "[pencil.circle] Setting A record: $NAME → $IP"

    # Delete existing record first
    curl -s -X DELETE \
        "https://api.godaddy.com/v1/domains/${DOMAIN}/records/A/${NAME}" \
        -H "Authorization: sso-key ${TECH16_GODADDY_API_KEY}:${TECH16_GODADDY_API_SECRET}"

    # Add new record
    RESPONSE=$(curl -s -X PATCH \
        "https://api.godaddy.com/v1/domains/${DOMAIN}/records" \
        -H "Authorization: sso-key ${TECH16_GODADDY_API_KEY}:${TECH16_GODADDY_API_SECRET}" \
        -H "Content-Type: application/json" \
        -d "[{\"type\": \"A\", \"name\": \"${NAME}\", \"data\": \"${IP}\", \"ttl\": 600}]")

    if [ -z "$RESPONSE" ]; then
        echo "[checkmark.circle] Success!"
    else
        echo "Response: $RESPONSE"
    fi
}

# Add root domain A record
add_a_record "@" "$VERCEL_IP"
echo ""

# Add www subdomain A record
add_a_record "www" "$VERCEL_IP"
echo ""

echo "[checkmark.circle] DNS configuration complete!"
echo ""
echo "[hourglass] DNS propagation can take 5-60 minutes"
echo "[magnifyingglass] Check status: https://www.whatsmydns.net/#A/16techpersonalities.com"
echo ""
echo "[iphone] Your site will be live at:"
echo "   - https://16techpersonalities.com"
echo "   - https://www.16techpersonalities.com"
