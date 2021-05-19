// This components implements the footer, which has a button.
// When the button is pressed, a callback is sent to App.tsx.

interface FooterProps {
    parentCallback(): void
}

const Footer = (props: FooterProps) => {
    
    return (
        <footer className="footer mt-auto px-5 py-3 bg-secondary">
            <button type="button" className="btn btn-primary" onClick={props.parentCallback}>GENERATE CHART</button>
        </footer>
    );
}

export default Footer;
