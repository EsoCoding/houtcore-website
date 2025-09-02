from django.core.management.base import BaseCommand
from content.models import ProcessStep

class Command(BaseCommand):
    help = 'Creates sample process steps'

    def handle(self, *args, **kwargs):
        # Create process steps
        process_steps = [
            {
                'title': 'Kennismaking & Consultatie',
                'description': 'We beginnen met een vrijblijvend gesprek om uw wensen en ideeën te bespreken. Tijdens deze fase verkennen we de mogelijkheden, materialen en budget.',
                'icon_name': 'clipboard-list',
                'order': 1,
                'is_active': True
            },
            {
                'title': 'Ontwerp & Voorstel',
                'description': 'Op basis van onze consultatie maak ik een ontwerp en gedetailleerd voorstel. Inclusief materiaalsamples, tijdlijn en een nauwkeurige offerte.',
                'icon_name': 'pencil-ruler',
                'order': 2,
                'is_active': True
            },
            {
                'title': 'Planning & Materialen',
                'description': 'Na goedkeuring van het voorstel plannen we het project in en bestellen we de benodigde materialen. Kwaliteit staat voorop in elke fase.',
                'icon_name': 'calendar',
                'order': 3,
                'is_active': True
            },
            {
                'title': 'Productie & Afwerking',
                'description': 'In mijn werkplaats gaat het maakproces van start. U wordt op de hoogte gehouden van de voortgang. Elk stuk krijgt de aandacht die het verdient.',
                'icon_name': 'hammer',
                'order': 4,
                'is_active': True
            },
            {
                'title': 'Levering & Plaatsing',
                'description': 'Het eindproduct wordt zorgvuldig geleverd en indien nodig geïnstalleerd. We controleren samen of alles aan uw verwachtingen voldoet.',
                'icon_name': 'truck',
                'order': 5,
                'is_active': True
            }
        ]
        
        for step_data in process_steps:
            if not ProcessStep.objects.filter(title=step_data['title']).exists():
                ProcessStep.objects.create(**step_data)
                self.stdout.write(self.style.SUCCESS(f'Created process step: {step_data["title"]}'))
            else:
                self.stdout.write(self.style.WARNING(f'Process step already exists: {step_data["title"]}'))
        
        self.stdout.write(self.style.SUCCESS('Sample process steps created successfully!'))
