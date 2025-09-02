from django.core.management.base import BaseCommand
from content.models import AboutSection, ServiceItem
import os
from django.conf import settings
from django.core.files import File
import shutil

class Command(BaseCommand):
    help = 'Creates sample about section and services'

    def handle(self, *args, **kwargs):
        # Create about section
        if not AboutSection.objects.exists():
            # Create media directory if it doesn't exist
            media_dir = os.path.join(settings.MEDIA_ROOT, 'content')
            os.makedirs(media_dir, exist_ok=True)
            
            # Copy image from public folder to media folder
            source_path = os.path.join(settings.BASE_DIR.parent, 'public', 'woodworking-workshop.png')
            dest_path = os.path.join(media_dir, 'woodworking-workshop.png')
            
            try:
                shutil.copy2(source_path, dest_path)
                
                # Create about section
                about_section = AboutSection(
                    title="Houtbewerking met Passie & Vakmanschap",
                    subtitle="Ambachtelijke Meubelmaker sinds 2010",
                    main_content="""
                    <p>Bij HoutCore zijn we gepassioneerd over het creëren van hoogwaardige houten meubels en interieurdetails op maat. Met ruim 15 jaar ervaring combineren we traditioneel vakmanschap met moderne technieken om unieke stukken te maken die generaties meegaan.</p>
                    
                    <p>Onze werkplaats in het hart van Nederland is uitgerust met de beste gereedschappen en materialen. We werken uitsluitend met duurzaam hout van verantwoorde bronnen, omdat we geloven in het maken van producten die zowel mooi als milieuvriendelijk zijn.</p>
                    
                    <p>Of het nu gaat om een eettafel voor het hele gezin, een op maat gemaakte inbouwkast, een stijlvolle trap of unieke interieuraccenten - bij HoutCore krijgt elk project de tijd en aandacht die het verdient. We luisteren naar uw wensen, denken mee in oplossingen en zorgen voor een eindresultaat waar u jarenlang van kunt genieten.</p>
                    
                    <p>Kwaliteit, duurzaamheid en persoonlijke service staan bij ons centraal. Neem contact met ons op om uw ideeën te bespreken en ontdek hoe we samen uw droomproject kunnen realiseren.</p>
                    """,
                    is_active=True
                )
                
                # Set the image field with the copied file
                with open(dest_path, 'rb') as img_file:
                    about_section.image.save(
                        os.path.basename(dest_path),
                        File(img_file),
                        save=False
                    )
                
                about_section.save()
                self.stdout.write(self.style.SUCCESS('Created about section'))
            except FileNotFoundError:
                self.stdout.write(self.style.ERROR(f'Image file not found: {source_path}'))
        else:
            self.stdout.write(self.style.WARNING('About section already exists'))
            
        # Create service items
        services = [
            {
                'title': 'Meubelmakerij',
                'description': 'Op maat gemaakte meubels zoals tafels, stoelen, kasten en bedden. Ambachtelijk vervaardigd met de beste materialen en afgewerkt naar wens.',
                'icon_name': 'chair',
                'order': 1
            },
            {
                'title': 'Interieurbouw',
                'description': 'Maatwerk interieuroplossingen zoals inbouwkasten, wandmeubels, keukens en badkamermeubels. Perfect passend in uw ruimte en afgestemd op uw wensen.',
                'icon_name': 'home',
                'order': 2
            },
            {
                'title': 'Trappen & Balustraden',
                'description': 'Stijlvolle en veilige trappen en balustraden die zowel functioneel als esthetisch zijn. Vakkundig ontworpen en geïnstalleerd.',
                'icon_name': 'stairs',
                'order': 3
            },
            {
                'title': 'Restauratie',
                'description': 'Zorgvuldige restauratie van antieke meubels en historische houten elementen. We herstellen met respect voor het origineel en oog voor detail.',
                'icon_name': 'tool',
                'order': 4
            },
        ]
        
        for service_data in services:
            if not ServiceItem.objects.filter(title=service_data['title']).exists():
                ServiceItem.objects.create(**service_data)
                self.stdout.write(self.style.SUCCESS(f'Created service: {service_data["title"]}'))
            else:
                self.stdout.write(self.style.WARNING(f'Service already exists: {service_data["title"]}'))
        
        self.stdout.write(self.style.SUCCESS('Sample content created successfully!'))
