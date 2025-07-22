package com.pies.therapist.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pies.patient.model.Patient;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Persistent entity representing a therapist account.
 */
@Entity
@Table(name = "therapists")
@Getter
@Setter
@NoArgsConstructor
public class Therapist implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // Only for responses, not requests
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String username;

    private String email;
    private String phoneNumber;

    /**
     * BCrypt-hashed password string (stored in DB, not exposed in JSON).
     */
    @JsonIgnore
    private String passwordHash;

    /**
     * Raw password (write-only, not persisted; only used for registration or
     * updates).
     */
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    /**
     * Account role for Spring Security.
     */
    @Enumerated(EnumType.STRING)
    private TherapistRole role;

    /**
     * Soft delete flag for business logic.
     */
    private boolean activeStatus = true;

    /**
     * Account enabled/disabled flag (for login).
     */
    private boolean enabled = true;

    /* ===== UserDetails implementation ===== */

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + role.name());
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Returns the account enabled flag for Spring Security.
     * Use `enabled` for authentication, and `activeStatus` for logical business
     * rules (e.g., soft delete).
     */
    @Override
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * Expose raw password for service logic (never persisted).
     */
    public String getRawPassword() {
        return this.password;
    }

    @OneToMany(mappedBy = "therapist")
    @JsonIgnore
    private List<Patient> patients;

}
