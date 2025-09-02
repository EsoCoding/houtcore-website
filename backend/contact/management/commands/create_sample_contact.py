from django.core.management.base import BaseCommand
from contact.models import ContactInfo

class Command(BaseCommand):
    help = 'Creates sample contact information'

    def handle(self, *args, **kwargs):
        # Create contact info
        contact_infos = [
            {
                'title': 'E-mail',
                'value': 'info@houtcore.nl',
                'description': 'We reageren binnen 24 uur',
                'icon_name': 'mail',
                'order': 1
            },
            {
                'title': 'Telefoon',
                'value': '+31 6 12345678',
                'description': 'Ma-Vr, 08:00 - 18:00',
                'icon_name': 'phone',
                'order': 2
            },
            {
                'title': 'Adres',
                'value': 'Timmermanstraat 123, 1234 AB Amsterdam',
                'description': 'Bezoek onze werkplaats en showroom',
                'icon_name': 'map-pin',
                'order': 3
            },
            # Removed Openingstijden entry as requested
        ]
        
        for info_data in contact_infos:
            if not ContactInfo.objects.filter(title=info_data['title']).exists():
                ContactInfo.objects.create(**info_data)
                self.stdout.write(self.style.SUCCESS(f'Created contact info: {info_data["title"]}'))
            else:
                self.stdout.write(self.style.WARNING(f'Contact info already exists: {info_data["title"]}'))
