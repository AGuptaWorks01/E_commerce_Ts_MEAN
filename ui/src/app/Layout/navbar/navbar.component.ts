import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private elRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const navbar = this.elRef.nativeElement.querySelector('.navbar-collapse');
    const button = this.elRef.nativeElement.querySelector('.navbar-toggler');

    // Check if the click is outside the navbar and the toggle button
    if (navbar && !this.elRef.nativeElement.contains(event.target) && !button.contains(event.target)) {
      navbar.classList.remove('show');
    }
  }
}
