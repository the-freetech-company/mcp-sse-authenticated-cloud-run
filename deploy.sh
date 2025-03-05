IMAGE_NAME="freetech-weather-mcp"
PROJECT_ID="freetech-stg"
REGION="us-central1"

# Use this if you are utilizing the Google Cloud SDK to perform authenticated actions within your mcp application - Add IAM roles as needed to this service account
SERVICE_ACCOUNT_EMAIL="service-account-email@project-id.iam.gserviceaccount.com"

docker build --no-cache -t $IMAGE_NAME -f Dockerfile . &&
    docker tag $IMAGE_NAME gcr.io/$PROJECT_ID/$IMAGE_NAME &&
    docker push gcr.io/$PROJECT_ID/$IMAGE_NAME &&

    # IMPORTANT - DO NOT ADD --allow-unauthenticated - YOU WILL AUTHENTICATE WITH PROXY CHECK THE README FOR MORE INFO
    # Since MCP isn't really fit for severless environemnts (for a few reasons..), we set the min/max scale both to 1.
    gcloud run deploy $IMAGE_NAME --image gcr.io/$PROJECT_ID/$IMAGE_NAME --project $PROJECT_ID --region $REGION --platform managed --min-instances 1 --max-instances 1 --service-account=$SERVICE_ACCOUNT_EMAIL
