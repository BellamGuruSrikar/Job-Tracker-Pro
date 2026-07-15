import uuid
from supabase import create_client
from django.conf import settings
import os

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_KEY
)

BUCKET = settings.SUPABASE_BUCKET


def upload_resume(file):
    filename = f"{uuid.uuid4()}_{file.name}"

    file.file.seek(0)

    supabase.storage.from_(BUCKET).upload(
        filename,
        file.file.read(),
        {
            "content-type": "application/pdf"
        }
    )

    url = supabase.storage.from_(BUCKET).get_public_url(filename)

    if isinstance(url, dict):
        return url.get("publicUrl")

    return str(url)

def delete_resume(url):
    if not url:
        return

    try:
        filename = os.path.basename(url)
        supabase.storage.from_(BUCKET).remove([filename])

    except Exception as e:
        print(f"Failed to delete resume: {e}")