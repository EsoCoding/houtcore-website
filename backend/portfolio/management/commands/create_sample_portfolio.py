import os
import shutil
from django.core.management.base import BaseCommand
from django.conf import settings
from portfolio.models import Category, PortfolioItem
from django.core.files import File

class Command(BaseCommand):
    help = 'Creates sample portfolio items using existing images'

    def handle(self, *args, **kwargs):
        # Create categories
        categories = [
            {'name': 'Trap', 'slug': 'trap'},
            {'name': 'Meubels', 'slug': 'meubels'},
            {'name': 'Kasten', 'slug': 'kasten'},
            {'name': 'Railing', 'slug': 'railing'},
        ]
        
        for cat_data in categories:
            category, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name']}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {category.name}'))
        
        # Get category instances for reference
        trap_category = Category.objects.get(slug='trap')
        meubels_category = Category.objects.get(slug='meubels')
        kasten_category = Category.objects.get(slug='kasten')
        railing_category = Category.objects.get(slug='railing')
        
        # Create media directory if it doesn't exist
        media_dir = os.path.join(settings.MEDIA_ROOT, 'portfolio')
        os.makedirs(media_dir, exist_ok=True)
        
        # Create sample portfolio items
        portfolio_items = [
            {
                'title': 'Houten Trap op Maat',
                'category': trap_category,
                'year': '2024',
                'description': 'Deze prachtige houten trap is handgemaakt met de beste materialen. De trap biedt niet alleen functionaliteit, maar voegt ook een elegante uitstraling toe aan uw interieur. Met nauwkeurige details en vakmanschap gebouwd voor jarenlang gebruik.',
                'image_source': 'wooden-staircase.jpeg',
                'features': ['Massief eikenhout', 'Anti-slip behandeling', 'Handgemaakte railing', 'Duurzame afwerking']
            },
            {
                'title': 'Eettafel Rustiek Eiken',
                'category': meubels_category,
                'year': '2023',
                'description': 'Deze rustieke eettafel is gemaakt van massief eikenhout met natuurlijke randen. Perfect als middelpunt voor gezellige familie-etentjes. Het robuuste ontwerp biedt stevigheid en karakter, terwijl de natuurlijke afwerking de schoonheid van het hout benadrukt.',
                'image_source': 'dining-table.jpeg',
                'features': ['Massief eikenhout', 'Natuurlijke randen', 'Robuust onderstel', 'Milieuvriendelijke afwerking']
            },
            {
                'title': 'Witte Balustrade',
                'category': railing_category,
                'year': '2025',
                'description': 'Deze moderne witte balustrade combineert veiligheid met stijl. Het minimalistische ontwerp past perfect in een hedendaags interieur en biedt een open gevoel terwijl het nog steeds een veilige afscheiding vormt. De hoogwaardige afwerking zorgt voor een langdurig mooie uitstraling.',
                'image_source': 'white-railing.jpeg',
                'features': ['Duurzaam ontwerp', 'Eenvoudig te reinigen', 'Kindvriendelijk', 'UV-bestendige coating']
            },
            {
                'title': 'Inbouwkast op Maat',
                'category': kasten_category,
                'year': '2024',
                'description': 'Deze inbouwkast is ontworpen om optimaal gebruik te maken van uw ruimte. Met verstelbare planken en op maat gemaakte deuren past deze kast perfect in elk interieur. De hoogwaardige materialen en vakkundige constructie garanderen jarenlang probleemloos gebruik.',
                'image_source': 'built-in-cabinet.jpeg',
                'features': ['Op maat gemaakt', 'Verstelbare planken', 'Soft-close scharnieren', 'Hoogwaardige afwerking']
            }
        ]
        
        # Copy images from public folder to media folder and create portfolio items
        for item_data in portfolio_items:
            # Check if item already exists to avoid duplicates
            if not PortfolioItem.objects.filter(title=item_data['title']).exists():
                # Copy image from public folder to media/portfolio folder
                source_path = os.path.join(settings.BASE_DIR.parent, 'public', item_data['image_source'])
                dest_path = os.path.join(media_dir, item_data['image_source'])
                
                try:
                    shutil.copy2(source_path, dest_path)
                    
                    # Create portfolio item
                    portfolio_item = PortfolioItem(
                        title=item_data['title'],
                        category=item_data['category'],
                        year=item_data['year'],
                        description=item_data['description'],
                        features=item_data['features']
                    )
                    
                    # Set the image field with the copied file
                    with open(dest_path, 'rb') as img_file:
                        portfolio_item.image.save(
                            os.path.basename(dest_path),
                            File(img_file),
                            save=False
                        )
                    
                    portfolio_item.save()
                    self.stdout.write(self.style.SUCCESS(f'Created portfolio item: {portfolio_item.title}'))
                except FileNotFoundError:
                    self.stdout.write(self.style.ERROR(f'Image file not found: {source_path}'))
            else:
                self.stdout.write(self.style.WARNING(f'Portfolio item already exists: {item_data["title"]}'))
        
        self.stdout.write(self.style.SUCCESS('Sample portfolio items created successfully!'))
