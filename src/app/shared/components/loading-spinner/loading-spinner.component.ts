import { Component } from '@angular/core'

@Component({
	selector: 'shared-loading-spinner',
	template: `
	  <div class="spinner-container">
		  <span>Searching</span>
		  <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
		  <svg width="30" height="30" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
			  <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
				  <circle cx="22" cy="22" r="6" stroke-opacity="0">
					  <animate attributeName="r"
							   begin="1.5s" dur="3s"
							   values="6;22"
							   calcMode="linear"
							   repeatCount="indefinite"/>
					  <animate attributeName="stroke-opacity"
							   begin="1.5s" dur="3s"
							   values="1;0" calcMode="linear"
							   repeatCount="indefinite"/>
					  <animate attributeName="stroke-width"
							   begin="1.5s" dur="3s"
							   values="2;0" calcMode="linear"
							   repeatCount="indefinite"/>
				  </circle>
				  <circle cx="22" cy="22" r="6" stroke-opacity="0">
					  <animate attributeName="r"
							   begin="3s" dur="3s"
							   values="6;22"
							   calcMode="linear"
							   repeatCount="indefinite"/>
					  <animate attributeName="stroke-opacity"
							   begin="3s" dur="3s"
							   values="1;0" calcMode="linear"
							   repeatCount="indefinite"/>
					  <animate attributeName="stroke-width"
							   begin="3s" dur="3s"
							   values="2;0" calcMode="linear"
							   repeatCount="indefinite"/>
				  </circle>
				  <circle cx="22" cy="22" r="8">
					  <animate attributeName="r"
							   begin="0s" dur="1.5s"
							   values="6;1;2;3;4;5;6"
							   calcMode="linear"
							   repeatCount="indefinite"/>
				  </circle>
			  </g>
		  </svg>
	  </div>
	`,
	styles: [`
      .spinner-container {
          position: fixed;
          bottom: 15px;
          right: 15px;
          background-color: black;
          color: white;
          padding: 5px 10px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
      }

      span {
          margin-left: 5px;
      }
	`]
})
export class LoadingSpinnerComponent {

}
