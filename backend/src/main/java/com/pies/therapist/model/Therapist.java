package com.pies.therapist.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

/** Persistent entity representing a therapist account */
@Entity @Table(name = "therapists")
@Getter @Setter @NoArgsConstructor
public class Therapist implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String username;

    private String email;
    private String phoneNumber;

    /** BCrypt hash string */
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private TherapistRole role;

    private boolean activeStatus = true;

    /* ===== UserDetails implementation ===== */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + role.name());
    }
    @Override public String getPassword()            { return passwordHash; }
    @Override public String getUsername()            { return username; }
    @Override public boolean isAccountNonExpired()   { return true; }
    @Override public boolean isAccountNonLocked()    { return true; }
    @Override public boolean isCredentialsNonExpired(){ return true; }
    @Override public boolean isEnabled()             { return activeStatus; }
}
